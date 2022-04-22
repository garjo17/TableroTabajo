Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
		   Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
                        models:['hierarchicalrequirement', 'defect','defectsuite', 'userstory','testset'],
                        autoLoad: true,
                        enableHierarchy: true
                    }).then({
                        success: this._onStoreBuilt,
                        scope: this
                    });
                },
            
                _onStoreBuilt: function(store) {
				var tablero = Ext.create('Rally.ui.gridboard.GridBoard',{
                    context: this.getContext(),
                    modelNames: ['hierarchicalrequirement', 'defect','defectsuite', 'userstory','testset'],
                    toggleState: 'grid',
                    plugins: [
						{ ptype: 'rallygridboardtoggleable'}
						,
						{ ptype: 'rallygridboardinlinefiltercontrol',
							stateful: true,
							inlineFilterButtonConfig: {
								modelNames: ['hierarchicalrequirement', 'defect','defectsuite', 'userstory','testset'],
								inlineFilterPanelConfig: {
									collapsed: false,
									quickFilterPanelConfig: {
										fieldNames: ['Owner', 'ScheduleState']
									}
								}
							}
						}
						,
						{ ptype: 'rallygridboardfieldpicker',
							headerPosition: 'left',
                            modelNames: ['hierarchicalrequirement', 'defect','defectsuite', 'userstory','testset'],
                            stateful: true,
                           
                        } 
                    ],
                    cardBoardConfig: {
                         attribute: 'ScheduleState'
                    },
                    gridConfig: {
                    store: store,
                        columnCfgs: [
                            'Name',
                            'ScheduleState',
                            'Owner',
                            'PlanEstimate'
                        ]
                    },
                    height: this.getHeight()
                    });
					this.add(tablero) ;
                }
				
            });
            
	