$wnd.hal.runAsyncCallback33("function SecurityDomain_0(property){\n  $clinit_SecurityDomain();\n  NamedNode_1.call(this, property);\n  this.$init_1084();\n}\n\ndefineClass(472, 17, {1:1, 472:1, 14:1, 17:1}, SecurityDomain_0);\nfunction $clinit_SecurityDomainColumn(){\n  $clinit_SecurityDomainColumn = emptyMethod;\n  $clinit_FinderColumn();\n}\n\nfunction SecurityDomainColumn(finder, columnActionFactory, itemActionFactory, crud, places){\n  $clinit_SecurityDomainColumn();\n  FinderColumn.call(this, (new FinderColumn$Builder(finder, 'security-domain', 'Security Domain')).columnAction(columnActionFactory.add_33(($clinit_Ids() , SECURITY_DOMAIN_ADD), 'Security Domain', ($clinit_AddressTemplates_12() , SECURITY_DOMAIN_TEMPLATE), singletonList('cache-type'))).itemsProvider_0(new SecurityDomainColumn$lambda$0$Type(crud)).withFilter_0().useFirstActionAsBreadcrumbHandler_0().onPreview_0(new SecurityDomainColumn$1methodref$ctor$Type));\n  this.$init_1085();\n  this.setItemRenderer(new SecurityDomainColumn$lambda$1$Type(this, itemActionFactory, places));\n}\n\nfunction lambda$0_150(crud_0, context_1, callback_2){\n  $clinit_SecurityDomainColumn();\n  {\n    crud_0.readChildren_3(($clinit_AddressTemplates_12() , SECURITY_SUBSYSTEM_TEMPLATE), 'security-domain', new SecurityDomainColumn$lambda$2$Type(callback_2));\n  }\n}\n\nfunction lambda$2_69(callback_0, children_1){\n  $clinit_SecurityDomainColumn();\n  var securityDomains;\n  {\n    securityDomains = castTo(children_1.stream().map_3(new SecurityDomainColumn$0methodref$ctor$Type).collect_0(toList()), 13);\n    callback_0.onSuccess_0(securityDomains);\n  }\n}\n\ndefineClass(2583, 34, {1:1, 34:1}, SecurityDomainColumn);\n_.$init_1085 = function $init_1085(){\n}\n;\n_.lambda$1_53 = function lambda$1_88(itemActionFactory_1, places_2, item_2){\n  $clinit_SecurityDomainColumn();\n  return new SecurityDomainColumn$1(this, item_2, itemActionFactory_1, places_2);\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn', 2583, Lorg_jboss_hal_core_finder_FinderColumn_2_classLit);\nfunction $clinit_SecurityDomainColumn$0methodref$ctor$Type(){\n  $clinit_SecurityDomainColumn$0methodref$ctor$Type = emptyMethod;\n}\n\nfunction SecurityDomainColumn$0methodref$ctor$Type(){\n  $clinit_SecurityDomainColumn$0methodref$ctor$Type();\n}\n\ndefineClass(2584, 1, {1:1}, SecurityDomainColumn$0methodref$ctor$Type);\n_.apply_2 = function apply_153(arg0){\n  return new SecurityDomain_0(castTo(arg0, 50));\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$0methodref$ctor$Type_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/0methodref$ctor$Type', 2584, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainColumn$1(){\n  $clinit_SecurityDomainColumn$1 = emptyMethod;\n  $clinit_Object();\n  $clinit_ItemDisplay_0();\n}\n\nfunction SecurityDomainColumn$1(this$0, val$item, val$itemActionFactory, val$places){\n  $clinit_SecurityDomainColumn$1();\n  this.this$01 = this$0;\n  this.val$item2 = val$item;\n  this.val$itemActionFactory3 = val$itemActionFactory;\n  this.val$places4 = val$places;\n  Object_0.call(this);\n  this.$init_1086();\n}\n\ndefineClass(2588, 1, {1:1}, SecurityDomainColumn$1);\n_.$init_1086 = function $init_1086(){\n}\n;\n_.asElement_0 = function asElement_57(){\n  return $asElement_0(this);\n}\n;\n_.getIcon = function getIcon_12(){\n  return $getIcon(this);\n}\n;\n_.getTooltip = function getTooltip_12(){\n  return $getTooltip(this);\n}\n;\n_.nextColumn_0 = function nextColumn_13(){\n  return $nextColumn(this);\n}\n;\n_.actions_0 = function actions_13(){\n  var actions;\n  actions = new ArrayList;\n  actions.add_0(this.val$itemActionFactory3.view_1(this.val$places4.selectedProfile_0('security-domain').with_0('name', this.val$item2.getName()).build_1()));\n  actions.add_0(this.val$itemActionFactory3.remove_17('Security Domain', this.val$item2.getName(), ($clinit_AddressTemplates_12() , SECURITY_DOMAIN_TEMPLATE), this.this$01));\n  return actions;\n}\n;\n_.getFilterData = function getFilterData_12(){\n  var data_0;\n  data_0 = new ArrayList;\n  data_0.add_0(this.val$item2.getName());\n  if (this.val$item2.hasDefined('cache-type')) {\n    data_0.add_0(this.val$item2.get_17('cache-type').asString());\n  }\n  return join_4(' ', data_0);\n}\n;\n_.getId = function getId_20(){\n  return securityDomain_0(this.val$item2.getName());\n}\n;\n_.getTitle = function getTitle_13(){\n  return this.val$item2.getName();\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$1_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/1', 2588, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainColumn$1methodref$ctor$Type(){\n  $clinit_SecurityDomainColumn$1methodref$ctor$Type = emptyMethod;\n}\n\nfunction SecurityDomainColumn$1methodref$ctor$Type(){\n  $clinit_SecurityDomainColumn$1methodref$ctor$Type();\n}\n\ndefineClass(2587, 1, {1:1}, SecurityDomainColumn$1methodref$ctor$Type);\n_.onPreview = function onPreview_10(arg0){\n  return new SecurityDomainPreview(castTo(arg0, 472));\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$1methodref$ctor$Type_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/1methodref$ctor$Type', 2587, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainColumn$lambda$0$Type(){\n  $clinit_SecurityDomainColumn$lambda$0$Type = emptyMethod;\n}\n\nfunction SecurityDomainColumn$lambda$0$Type(crud_0){\n  $clinit_SecurityDomainColumn$lambda$0$Type();\n  this.crud_0 = crud_0;\n}\n\ndefineClass(2586, 1, {1:1}, SecurityDomainColumn$lambda$0$Type);\n_.get_13 = function get_182(arg0, arg1){\n  lambda$0_150(this.crud_0, arg0, arg1);\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$lambda$0$Type_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/lambda$0$Type', 2586, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainColumn$lambda$1$Type(){\n  $clinit_SecurityDomainColumn$lambda$1$Type = emptyMethod;\n}\n\nfunction SecurityDomainColumn$lambda$1$Type($$outer_0, itemActionFactory_1, places_2){\n  $clinit_SecurityDomainColumn$lambda$1$Type();\n  this.$$outer_0 = $$outer_0;\n  this.itemActionFactory_1 = itemActionFactory_1;\n  this.places_2 = places_2;\n}\n\ndefineClass(2589, 1, {1:1}, SecurityDomainColumn$lambda$1$Type);\n_.render_3 = function render_68(arg0){\n  return this.$$outer_0.lambda$1_53(this.itemActionFactory_1, this.places_2, arg0);\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$lambda$1$Type_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/lambda$1$Type', 2589, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainColumn$lambda$2$Type(){\n  $clinit_SecurityDomainColumn$lambda$2$Type = emptyMethod;\n}\n\nfunction SecurityDomainColumn$lambda$2$Type(callback_0){\n  $clinit_SecurityDomainColumn$lambda$2$Type();\n  this.callback_0 = callback_0;\n}\n\ndefineClass(2585, 1, {1:1}, SecurityDomainColumn$lambda$2$Type);\n_.execute_8 = function execute_242(arg0){\n  lambda$2_69(this.callback_0, arg0);\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainColumn$lambda$2$Type_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainColumn/lambda$2$Type', 2585, Ljava_lang_Object_2_classLit);\nfunction $clinit_SecurityDomainPreview(){\n  $clinit_SecurityDomainPreview = emptyMethod;\n  $clinit_PreviewContent();\n}\n\nfunction SecurityDomainPreview(securityDomain){\n  $clinit_SecurityDomainPreview();\n  var attributes;\n  PreviewContent.call(this, securityDomain.getName());\n  this.$init_1091();\n  attributes = (new PreviewAttributes_2(securityDomain, singletonList('cache-type'))).end_0();\n  this.previewBuilder().addAll_0(attributes);\n}\n\ndefineClass(3217, 38, {1:1, 10:1, 38:1}, SecurityDomainPreview);\n_.$init_1091 = function $init_1091(){\n}\n;\nvar Lorg_jboss_hal_client_configuration_subsystem_security_SecurityDomainPreview_2_classLit = createForClass('org.jboss.hal.client.configuration.subsystem.security', 'SecurityDomainPreview', 3217, Lorg_jboss_hal_core_finder_PreviewContent_2_classLit);\ndefineClass(1130, 1, {1:1});\n_.get_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$ = function get_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$(){\n  var result;\n  result = this.org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_methodInjection(this.injector.getFragment_org_jboss_hal_core_finder().get_Key$type$org$jboss$hal$core$finder$Finder$_annotation$$none$$(), this.injector.getFragment_org_jboss_hal_core_finder().get_Key$type$org$jboss$hal$core$finder$ColumnActionFactory$_annotation$$none$$(), this.injector.getFragment_org_jboss_hal_core_finder().get_Key$type$org$jboss$hal$core$finder$ItemActionFactory$_annotation$$none$$(), this.injector.getFragment_org_jboss_hal_core().get_Key$type$org$jboss$hal$core$CrudOperations$_annotation$$none$$(), this.injector.getFragment_org_jboss_hal_core_mvp().get_Key$type$org$jboss$hal$core$mvp$Places$_annotation$$none$$());\n  this.memberInject_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$(result);\n  return result;\n}\n;\n_.memberInject_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$ = function memberInject_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$(injectee){\n}\n;\n_.org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_methodInjection = function org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn_methodInjection(_0, _1, _2, _3, _4){\n  return new SecurityDomainColumn(_0, _1, _2, _3, _4);\n}\n;\ndefineClass(1136, 1, {57:1, 1:1});\n_.onSuccess_1 = function onSuccess_123(){\n  this.val$callback2.onSuccess_0(this.this$11.this$01.get_Key$type$org$jboss$hal$client$configuration$subsystem$security$SecurityDomainColumn$_annotation$$none$$());\n}\n;\n$entry(onLoad)(33);\n\n//# sourceURL=hal-33.js\n")