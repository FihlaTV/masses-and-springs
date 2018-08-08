// Copyright 2017-2018, University of Colorado Boulder

/**
 * Spring view used for the energy screen.
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var ToolboxPanel = require( 'MASSES_AND_SPRINGS/common/view/ToolboxPanel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var OneSpringScreenView = require( 'MASSES_AND_SPRINGS/common/view/OneSpringScreenView' );

  /**
   * @param {EnergyModel} model
   * @param {Tandem} tandem
   *
   * @constructor
   */
  function EnergyScreenView( model, tandem ) {

    // Calls common spring view
    OneSpringScreenView.call( this, model, tandem, {
      dampingVisible: true
    } );
    var self = this;

    // Contains visibility options for the reference lines and displacement arrow
    var indicatorVisibilityControlNode = this.createIndicatorVisibilityPanel( model, false, tandem );

    // VBox that contains all of the panel's content
    var optionsVBox = new VBox( {
      spacing: 10,
      children: [
        indicatorVisibilityControlNode,
        MassesAndSpringsConstants.LINE_SEPARATOR( 165 ),
        this.gravityAndDampingControlNode
      ]
    } );

    // Panel that will display all the toggleable options.
    var optionsPanel = this.createOptionsPanel( optionsVBox, tandem );

    // @private {ToolboxPanel} Toolbox Panel
    var toolboxPanel = new ToolboxPanel(
      this.visibleBoundsProperty.get(),
      this.rulerNode, this.timerNode,
      model.rulerVisibleProperty,
      model.timerVisibleProperty,
      tandem.createTandem( 'toolboxPanel' ), {
        minWidth: optionsPanel.width
      }
    );

    // Contains all of the options for the reference lines, gravity, damping, and toolBox
    var rightPanelsVBox = new VBox( { children: [ optionsPanel, toolboxPanel ], spacing: this.spacing * 0.9 } );
    this.addChild( rightPanelsVBox );
    rightPanelsVBox.moveToBack();

    this.visibleBoundsProperty.link( function() {
      rightPanelsVBox.rightTop = new Vector2( self.panelRightSpacing, self.energyGraphNode.top );
    } );

    this.shelf.rectWidth = 140;
    this.shelf.left = this.energyGraphNode.right + this.spacing;

    // Move this plane to the back of the scene graph
    this.backgroundDragNode.moveToBack();
  }

  massesAndSprings.register( 'EnergyScreenView', EnergyScreenView );

  return inherit( OneSpringScreenView, EnergyScreenView );
} );