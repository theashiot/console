/*
 * Copyright 2015-2016 Red Hat, Inc, and individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.hal.client.configuration.subsystem.elytron;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import elemental2.dom.HTMLElement;
import org.jboss.gwt.elemento.core.IsElement;
import org.jboss.hal.ballroom.Attachable;
import org.jboss.hal.ballroom.LabelBuilder;
import org.jboss.hal.ballroom.Pages;
import org.jboss.hal.ballroom.Tabs;
import org.jboss.hal.ballroom.form.Form;
import org.jboss.hal.ballroom.table.Table;
import org.jboss.hal.core.mbui.form.ModelNodeForm;
import org.jboss.hal.core.mbui.table.ModelNodeTable;
import org.jboss.hal.core.mbui.table.TableButtonFactory;
import org.jboss.hal.core.mvp.HasPresenter;
import org.jboss.hal.dmr.ModelNode;
import org.jboss.hal.dmr.NamedNode;
import org.jboss.hal.meta.Metadata;
import org.jboss.hal.resources.Ids;
import org.jboss.hal.resources.Names;
import org.jboss.hal.resources.Resources;
import org.jetbrains.annotations.NonNls;

import static org.jboss.gwt.elemento.core.Elements.h;
import static org.jboss.gwt.elemento.core.Elements.p;
import static org.jboss.gwt.elemento.core.Elements.section;
import static org.jboss.hal.core.Strings.abbreviateMiddle;
import static org.jboss.hal.dmr.ModelDescriptionConstants.*;
import static org.jboss.hal.dmr.ModelNodeHelper.failSafeGet;
import static org.jboss.hal.dmr.ModelNodeHelper.failSafeList;
import static org.jboss.hal.dmr.ModelNodeHelper.storeIndex;

class JdbcRealmElement implements IsElement<HTMLElement>, Attachable, HasPresenter<RealmsPresenter> {

    private final Table<NamedNode> jdbcRealmTable;
    private final Table<ModelNode> pqTable; // pq = principal-query
    private final Form<ModelNode> pqForm;
    private final Map<String, Form<ModelNode>> keyMappers;
    private final Table<ModelNode> amTable; // am = attribute-mapping
    private final Form<ModelNode> amForm;
    private final Pages pages;
    private RealmsPresenter presenter;
    private String selectedJdbcRealm;
    private String selectedPrincipalQuery;
    private int pqIndex = -1;
    private int amIndex = -1;

    JdbcRealmElement(final Metadata metadata, final TableButtonFactory tableButtonFactory, final Resources resources) {

        // JDBC realm
        jdbcRealmTable = new ModelNodeTable.Builder<NamedNode>(Ids.ELYTRON_JDBC_REALM_TABLE, metadata)
                .button(tableButtonFactory.add(metadata.getTemplate(), table -> presenter.addJdbcRealm()))
                .button(tableButtonFactory.remove(Names.JDBC_REALM, AddressTemplates.JDBC_REALM_ADDRESS,
                        () -> presenter.reloadJdbcRealms()))
                .column(NAME, (cell, type, row, meta) -> row.getName())
                .column(Names.PRINCIPAL_QUERY, this::showPrincipalQuery)
                .build();
        HTMLElement jdbcRealmSection = section()
                .add(h(1).textContent(Names.JDBC_REALM))
                .add(p().textContent(metadata.getDescription().getDescription()))
                .add(jdbcRealmTable)
                .asElement();

        // principal query and key mappers
        Metadata pqMetadata = metadata.forComplexAttribute(PRINCIPAL_QUERY);
        pqTable = new ModelNodeTable.Builder<>(Ids.ELYTRON_PRINCIPAL_QUERY_TABLE, pqMetadata)
                .button(tableButtonFactory.add(pqMetadata.getTemplate(),
                        table -> presenter.addPrincipalQuery(selectedJdbcRealm)))
                .button(tableButtonFactory.remove(pqMetadata.getTemplate(),
                        table -> presenter.removePrincipalQuery(selectedJdbcRealm, pqIndex)))
                .columns(SQL, DATA_SOURCE)
                .column(Names.ATTRIBUTE_MAPPING, this::showAttributeMappings, "12em") //NON-NLS
                .build();

        Tabs tabs = new Tabs();

        String tabId = Ids.build(Ids.ELYTRON_PRINCIPAL_QUERY, ATTRIBUTES, Ids.TAB_SUFFIX);
        String formId = Ids.build(Ids.ELYTRON_PRINCIPAL_QUERY, ATTRIBUTES, Ids.FORM_SUFFIX);
        pqForm = new ModelNodeForm.Builder<>(formId, pqMetadata)
                .include(SQL, DATA_SOURCE)
                .onSave((f, changedValues) -> presenter.savePrincipalQuery(selectedJdbcRealm, pqIndex, changedValues))
                .build();
        tabs.add(tabId, resources.constants().attributes(), pqForm.asElement());

        keyMappers = new LinkedHashMap<>();
        for (String keyMapper : RealmsPresenter.KEY_MAPPERS) {
            Form<ModelNode> form = keyMapperForm(pqMetadata, keyMapper);
            keyMappers.put(keyMapper, form);
            tabs.add(Ids.build(Ids.ELYTRON_PRINCIPAL_QUERY, keyMapper, Ids.TAB_SUFFIX),
                    new LabelBuilder().label(keyMapper), form.asElement());
        }

        HTMLElement pqSection = section()
                .add(h(1).textContent(Names.PRINCIPAL_QUERY))
                .add(p().textContent(pqMetadata.getDescription().getDescription()))
                .addAll(pqTable, tabs)
                .asElement();

        // attribute mapping
        Metadata amMetadata = pqMetadata.forComplexAttribute(ATTRIBUTE_MAPPING);
        amTable = new ModelNodeTable.Builder<>(Ids.ELYTRON_JDBC_REALM_ATTRIBUTE_MAPPING_TABLE, amMetadata)
                .button(tableButtonFactory.add(amMetadata.getTemplate(),
                        table -> presenter.addAttributeMapping(selectedJdbcRealm, pqIndex)))
                .button(tableButtonFactory.remove(amMetadata.getTemplate(),
                        table -> presenter.removeAttributeMapping(selectedJdbcRealm, pqIndex, amIndex)))
                .columns(TO, INDEX)
                .build();
        amForm = new ModelNodeForm.Builder<>(Ids.ELYTRON_JDBC_REALM_ATTRIBUTE_MAPPING_FORM, amMetadata)
                .include(TO, INDEX)
                .onSave((form, changedValues) -> presenter.saveAttributeMapping(selectedJdbcRealm, pqIndex, amIndex,
                        changedValues))
                .build();
        HTMLElement amSection = section()
                .add(h(1).textContent(Names.ATTRIBUTE_MAPPING))
                .add(p().textContent(amMetadata.getDescription().getDescription()))
                .addAll(amTable, amForm)
                .asElement();

        pages = new Pages(Ids.ELYTRON_JDBC_REALM_PAGE, jdbcRealmSection);
        pages.addPage(Ids.ELYTRON_JDBC_REALM_PAGE, Ids.ELYTRON_PRINCIPAL_QUERY_PAGE,
                () -> Names.JDBC_REALM + ": " + selectedJdbcRealm,
                () -> Names.PRINCIPAL_QUERY,
                pqSection);
        pages.addPage(Ids.ELYTRON_PRINCIPAL_QUERY_PAGE, Ids.ELYTRON_JDBC_REALM_ATTRIBUTE_MAPPING_PAGE,
                () -> Names.PRINCIPAL_QUERY + ": " + abbreviateMiddle(selectedPrincipalQuery, 25),
                () -> Names.ATTRIBUTE_MAPPING,
                amSection);
    }

    private Form<ModelNode> keyMapperForm(final Metadata metadata, @NonNls String keyMapper) {
        String formId = Ids.build(Ids.ELYTRON_PRINCIPAL_QUERY, keyMapper, Ids.FORM_SUFFIX);
        Metadata keyMapperMetadata = metadata.forComplexAttribute(keyMapper);
        return new ModelNodeForm.Builder<>(formId, keyMapperMetadata)
                .singleton(
                        () -> {
                            if (pqTable.hasSelection()) {
                                return presenter.pingKeyMapper(selectedJdbcRealm,
                                        pqTable.selectedRow(), keyMapper);
                            }
                            return null;
                        },
                        () -> presenter.addKeyMapper(selectedJdbcRealm, pqTable.selectedRow(), pqIndex, keyMapper))
                .onSave((f, changedValues) -> presenter.saveKeyMapper(selectedJdbcRealm, pqIndex,
                        keyMapper, changedValues))
                .prepareReset(f -> presenter.resetKeyMapper(selectedJdbcRealm, pqIndex,
                        keyMapper, f))
                .prepareRemove(f -> presenter.removeKeyMapper(selectedJdbcRealm, pqIndex,
                        keyMapper, f))
                .build();
    }

    @Override
    public HTMLElement asElement() {
        return pages.asElement();
    }

    @Override
    public void attach() {
        jdbcRealmTable.attach();

        pqTable.attach();
        pqForm.attach();
        pqTable.bindForm(pqForm);

        for (Form<ModelNode> form : keyMappers.values()) {
            form.attach();
        }
        pqTable.onSelectionChange(table -> {
            if (table.hasSelection()) {
                pqIndex = table.selectedRow().get(HAL_INDEX).asInt();
                selectedPrincipalQuery = table.selectedRow().get(SQL).asString();
                keyMappers.forEach((attribute, form) -> form.view(failSafeGet(table.selectedRow(), attribute)));
            } else {
                pqIndex = -1;
                for (Form<ModelNode> form : keyMappers.values()) {
                    form.clear();
                }
            }
        });

        amTable.attach();
        amForm.attach();
        amTable.bindForm(amForm);
        amTable.onSelectionChange(table -> {
            if (table.hasSelection()) {
                amIndex = table.selectedRow().get(HAL_INDEX).asInt();
            } else {
                amIndex = -1;
            }
        });
    }

    @Override
    public void setPresenter(final RealmsPresenter presenter) {
        this.presenter = presenter;
    }

    void update(List<NamedNode> nodes) {
        jdbcRealmTable.update(nodes);

        if (Ids.ELYTRON_PRINCIPAL_QUERY_PAGE.equals(pages.getCurrentId())) {
            nodes.stream()
                    .filter(jdbcRealm -> selectedJdbcRealm.equals(jdbcRealm.getName()))
                    .findFirst()
                    .ifPresent(this::showPrincipalQuery);
        } else if (Ids.ELYTRON_JDBC_REALM_ATTRIBUTE_MAPPING_PAGE.equals(pages.getCurrentId())) {
            nodes.stream()
                    .filter(jdbcRealm -> selectedJdbcRealm.equals(jdbcRealm.getName()))
                    .findFirst()
                    .ifPresent(jdbcRealm -> {
                        List<ModelNode> pqNodes = failSafeList(jdbcRealm, PRINCIPAL_QUERY);
                        storeIndex(pqNodes);
                        for (Form<ModelNode> form : keyMappers.values()) {
                            form.clear();
                        }
                        pqTable.update(pqNodes,
                                node -> Ids.build(node.get(SQL).asString(), node.get(DATA_SOURCE).asString()));
                        pqNodes.stream()
                                // TODO Is it safe to assume that the SQL is unique across the principal queries?
                                .filter(pq -> selectedPrincipalQuery.equals(pq.get(SQL).asString()))
                                .findFirst()
                                .ifPresent(this::showAttributeMappings);
                    });
        }
    }

    private void showPrincipalQuery(final NamedNode jdbcRealm) {
        selectedJdbcRealm = jdbcRealm.getName();
        List<ModelNode> pqNodes = failSafeList(jdbcRealm, PRINCIPAL_QUERY);
        storeIndex(pqNodes);
        for (Form<ModelNode> form : keyMappers.values()) {
            form.clear();
        }
        pqTable.update(pqNodes, node -> Ids.build(node.get(SQL).asString(), node.get(DATA_SOURCE).asString()));
        pages.showPage(Ids.ELYTRON_PRINCIPAL_QUERY_PAGE);
    }

    private void showAttributeMappings(final ModelNode principalQuery) {
        selectedPrincipalQuery = principalQuery.get(SQL).asString();
        pqIndex = principalQuery.get(HAL_INDEX).asInt();
        List<ModelNode> amNodes = failSafeList(principalQuery, ATTRIBUTE_MAPPING);
        storeIndex(amNodes);
        amForm.clear();
        amTable.update(amNodes, node -> Ids.build(node.get(TO).asString(), String.valueOf(node.get(INDEX).asInt())));
        pages.showPage(Ids.ELYTRON_JDBC_REALM_ATTRIBUTE_MAPPING_PAGE);
    }
}
