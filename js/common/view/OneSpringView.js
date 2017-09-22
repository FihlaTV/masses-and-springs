// Copyright 2016-2017, University of Colorado Boulder

/**
 * Common ScreenView for  using one mass.
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var EnergyGraphNode = require( 'MASSES_AND_SPRINGS/common/view/EnergyGraphNode' );
  var GravityAndFrictionControlPanel = require( 'MASSES_AND_SPRINGS/common/view/GravityAndFrictionControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var MassValueControlPanel = require( 'MASSES_AND_SPRINGS/common/view/MassValueControlPanel' );
  var MovableLineNode = require( 'MASSES_AND_SPRINGS/common/view/MovableLineNode' );
  var ReferenceLineNode = require( 'MASSES_AND_SPRINGS/common/view/ReferenceLineNode' );
  var SpringHangerNode = require( 'MASSES_AND_SPRINGS/common/view/SpringHangerNode' );
  var SpringView = require( 'MASSES_AND_SPRINGS/common/view/SpringView' );
  var ToolboxPanel = require( 'MASSES_AND_SPRINGS/common/view/ToolboxPanel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * TODO::: Remove modelViewTransform2 transforms from view objects
   * TODO::: Factor out colors to a Constants object
   * TODO::: Factor out thumb size, track size, etc other slider properties
   * @param {MassesAndSpringsModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function OneSpringView( model, tandem ) {
    this.model = model; // Make model available
    SpringView.call( this, model, tandem, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
    var self = this;

    var springHangerNode = new SpringHangerNode( model.springs,
      this.modelViewTransform,
      tandem.createTandem( 'springHangerNode' ),
      {
        singleSpring: true
      } );

    // Spring Constant Control Panel
    var springConstantControlPanel = this.createSpringConstantPanel( 0, tandem );
    springConstantControlPanel.right = this.indicatorVisibilityControlPanel.left - this.spacing;

    springHangerNode.top = springConstantControlPanel.top;

    // @public Initializes equilibrium line for the spring
    var springEquilibriumLineNode = new ReferenceLineNode(
      MassesAndSpringsConstants.MODEL_VIEW_TRANSFORM( this.visibleBoundsProperty.get(), 0.98 ),
      model.springs[ 0 ],
      model.springs[ 0 ].equilibriumYPositionProperty,
      model.equilibriumPositionVisibleProperty
    );

    // @public Initializes natural line for the spring
    var naturalLengthLineNode = new ReferenceLineNode(
      MassesAndSpringsConstants.MODEL_VIEW_TRANSFORM( this.visibleBoundsProperty.get(), 0.98 ),
      model.springs[ 0 ],
      model.springs[ 0 ].bottomProperty,
      model.naturalLengthVisibleProperty
    );


    var springStopperButtonNode = this.createStopperButton( this.model.springs[ 0 ], tandem );
    springStopperButtonNode.right = springConstantControlPanel.left - this.spacing;

    var energyGraphNode = new EnergyGraphNode( model, tandem );
    energyGraphNode.top = this.visibleBoundsProperty.get().top + this.spacing;
    energyGraphNode.left = this.visibleBoundsProperty.get().left + this.spacing;

    var massValueControlPanel = new MassValueControlPanel(
      model.masses[ 0 ],
      tandem.createTandem( 'massValueControlPanel' )
    );
    massValueControlPanel.top = this.visibleBoundsProperty.get().getMinY() + this.spacing;
    massValueControlPanel.left = energyGraphNode.right + this.spacing;
    springHangerNode.right = springStopperButtonNode.left - this.spacing;

    // Initializes movable line
    var movableLineNode = new MovableLineNode(
      springHangerNode.getCenter().plus( new Vector2( 45, 200 ) ),
      100,
      model.movableLineVisibleProperty,
      springHangerNode.centerX + 5,
      tandem.createTandem( 'movableLineNode' )
    );

    // Gravity Control Panel
    this.gravityAndFrictionControlPanel = new GravityAndFrictionControlPanel(
      model, this, tandem.createTandem( 'gravityAndFrictionControlPanel' ),
      {
        right: this.rightPanelAlignment,
        top: this.indicatorVisibilityControlPanel.bottom + MassesAndSpringsConstants.PANEL_VERTICAL_SPACING,
        minWidth: 1,
        maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH,
        frictionVisible: true
      }
    );

    // Toolbox Panel
    this.toolboxPanel = new ToolboxPanel(
      this.visibleBoundsProperty.get(),
      this.rulerNode, this.timerNode,
      model.rulerVisibleProperty,
      model.timerVisibleProperty,
      tandem.createTandem( 'toolboxPanel' ),
      {
        top: this.gravityAndFrictionControlPanel.bottom + MassesAndSpringsConstants.PANEL_VERTICAL_SPACING,
        left: this.gravityAndFrictionControlPanel.left,
        minWidth: this.gravityAndFrictionControlPanel.width,
        maxWidth: MassesAndSpringsConstants.PANEL_MAX_WIDTH
      }
    );

    // Done to for movableDragHandler handling intersecting bounds of panel and ruler
    this.rulerNode.toolbox = this.toolboxPanel;
    this.timerNode.toolbox = this.toolboxPanel;

    this.toolboxPanel.top = this.gravityAndFrictionControlPanel.bottom + MassesAndSpringsConstants.PANEL_VERTICAL_SPACING;
    this.toolboxPanel.left = this.gravityAndFrictionControlPanel.left;
    this.toolboxPanel.minWidth = this.gravityAndFrictionControlPanel.width;

    //TODO: Make this an array. this.children = [] and add this as an option object. Follow Griddle VerticalBarChart as example.
    // Adding all of the nodes to the scene graph
    // Adding Panels to scene graph
    this.addChild( springHangerNode );
    this.addChild( massValueControlPanel );
    this.addChild( springConstantControlPanel );
    this.addChild( this.indicatorVisibilityControlPanel );
    this.addChild( this.gravityAndFrictionControlPanel );
    this.addChild( this.toolboxPanel );
    this.addChild( energyGraphNode );

    // Adding Buttons to scene graph
    this.addChild( this.resetAllButton );
    this.addChild( this.timeControlPanel );
    this.addChild( this.speedControl );
    this.addChild( springStopperButtonNode );

    // Reference lines from indicator visibility box
    this.addChild( springEquilibriumLineNode );
    this.addChild( naturalLengthLineNode );
    this.addChild( movableLineNode );
    this.addChild( this.massLayer );

    // Adding Nodes in tool box
    this.addChild( this.timerNode );
    this.addChild( this.rulerNode );

    // Adjust the floating panels to the visibleBounds of the screen.
    this.visibleBoundsProperty.link( function( visibleBounds ) {

      //Update the bounds of view elements
      self.indicatorVisibilityControlPanel.right = visibleBounds.right - self.spacing;
      self.gravityAndFrictionControlPanel.right = visibleBounds.right - self.spacing;
      self.toolboxPanel.right = visibleBounds.right - self.spacing;
      self.resetAllButton.right = visibleBounds.right - self.spacing;
      self.speedControl.right = self.resetAllButton.left - self.spacing * 6;
      self.timeControlPanel.right = self.speedControl.left - self.spacing * 6;
      self.toolboxPanel.dragBounds = 3;
      energyGraphNode.left = visibleBounds.left + self.spacing;
      self.timerNode.updateBounds( visibleBounds.withOffsets(
        self.timerNode.width / 2, self.timerNode.height / 2, -self.timerNode.width / 2, -self.timerNode.height / 2
      ) );
      self.rulerNode.updateBounds( visibleBounds.withOffsets(
        -self.rulerNode.width / 2, self.rulerNode.height / 2, self.rulerNode.width / 2, -self.rulerNode.height / 2
      ) );
      self.massNodes.forEach( function( massNode ) {
        massNode.movableDragHandler.dragBounds = self.modelViewTransform.viewToModelBounds( visibleBounds );

        if ( massNode.centerX > visibleBounds.maxX ) {
          massNode.mass.positionProperty.set(
            new Vector2( self.modelViewTransform.viewToModelX( visibleBounds.maxX ), massNode.mass.positionProperty.get().y )
          );
        }
        if ( massNode.centerX < visibleBounds.minX ) {
          massNode.mass.positionProperty.set(
            new Vector2( self.modelViewTransform.viewToModelX( visibleBounds.minX ), massNode.mass.positionProperty.get().y )
          );
        }
      } );
    } );
  }

  massesAndSprings.register( 'OneSpringView', OneSpringView );

  return inherit( SpringView, OneSpringView );
} );