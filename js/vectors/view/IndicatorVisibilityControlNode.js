// Copyright 2017-2018, University of Colorado Boulder

/**
 * Panel that manages options for visibility of reference lines on vector screen.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BracketNode = require( 'SCENERY_PHET/BracketNode' );
  var DisplacementArrowNode = require( 'MASSES_AND_SPRINGS/vectors/view/DisplacementArrowNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  var massEquilibriumString = require( 'string!MASSES_AND_SPRINGS/massEquilibrium' );
  var movableLineString = require( 'string!MASSES_AND_SPRINGS/movableLine' );
  var displacementString = require( 'string!MASSES_AND_SPRINGS/displacement' );
  var naturalLengthString = require( 'string!MASSES_AND_SPRINGS/naturalLength' );
  var periodTraceString = require( 'string!MASSES_AND_SPRINGS/periodTrace' );

  /**
   * @param {MassesAndSpringsModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function IndicatorVisibilityControlNode( model, tandem, options ) {
    options = _.extend( {
      fill: MassesAndSpringsConstants.PANEL_FILL,
      tandem: tandem.createTandem( 'indicatorVisibilityControlNode' ),
      minWidth: MassesAndSpringsConstants.PANEL_MIN_WIDTH,
      periodTraceOption: false
    }, options );

    Node.call( this, options );

    /**
     * Creates line for visual representation within the panel.
     * @param {string} color
     * @param {Tandem} tandem
     * @returns {Line} line object with passed in color.
     */
    //REVIEW: Looks suspiciously duplicated from LineVisibilityNode. Can/should some code be factored out?
    var createLine = function( color, tandem ) {
      return new Line( 0, 0, 25, 0, {
        stroke: color,
        lineDash: [ 6, 2.5 ],
        lineWidth: 2.0,
        cursor: 'pointer',
        tandem: tandem
      } );
    };

    // Lines added for reference in panel
    //REVIEW: Looks suspiciously duplicated from LineVisibilityNode. Can/should some code be factored out?
    var blackLine = createLine( 'black', tandem.createTandem( 'blackLine' ) );
    var blueLine = createLine( 'rgb( 65, 66, 232 )', tandem.createTandem( 'blueLine' ) );
    var redLine = createLine( 'red', tandem.createTandem( 'redLine' ) );
    var grayLine = createLine( '#e6e6e6' ); // TODO: we shouldn't need this for spacing on lab screen.
    //REVIEW: Handle TODO
    var displacementSymbol = new DisplacementArrowNode(
      new Property( 10 ), //REVIEW: NumberProperty?
      new Property( true ), //REVIEW: BooleanProperty?
      //REVIEW: Or... can we maybe make a dev meeting note to see if we can just leave "never-changing" Properties like this as Property instead of using subtypes?
      tandem,
      {
        modelViewTransform: this.modelViewTransform,
        symbolRepresentation: true
      }
    );
    //REVIEW: Just pass these options into the DisplacementArrowNode options? ( e.g. scale: ... )
    displacementSymbol.scale( .65 );

    // Labels for the displacement arrow and natural length line
    var displacementLabels = new VBox( {
      spacing: 8,
      align: 'left',
      children: [
        new Text( displacementString, {
          font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'displacementString' )
        } ),
        new Text( naturalLengthString, {
          font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'naturalLengthString' )
        } )
      ]
    } );

    // the bracket at the left - this is tweaked a bit for optimal appearance
    var bracket = new VBox( {
      children: [
        new BracketNode( {
          orientation: 'left',
          bracketLength: displacementLabels.height,
          bracketLineWidth: 2,
          bracketStroke: 'black',
          bracketTipLocation: 0.475
        } )
      ]
    } );

    var bracketToTextSpacing = 2;
    var componentDisplacement = new HBox( {
      spacing: bracketToTextSpacing,
      children: [ bracket, displacementLabels ]
    } );

    var indicatorVisibilityCheckboxGroup = new VerticalCheckboxGroup( [ {
      content: componentDisplacement,
      property: model.naturalLengthVisibleProperty
    }, {
      content: new Text( massEquilibriumString, {
        font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'massEquilibriumString' )
      } ),
      property: model.equilibriumPositionVisibleProperty
    }, {
      content: new Text( movableLineString, {
        font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'movableLineString' )
      } ),
      property: model.movableLineVisibleProperty
    } ], {
      boxWidth: 15,
      spacing: 8,
      tandem: tandem.createTandem( 'indicatorVisibilityCheckboxGroup' )
    } );

    if ( options.periodTraceOption ) {
      indicatorVisibilityCheckboxGroup = new VerticalCheckboxGroup( [ {
        content: componentDisplacement,
        property: model.naturalLengthVisibleProperty
      }, {
        content: new Text( massEquilibriumString, {
          font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'massEquilibriumString' )
        } ),
        property: model.equilibriumPositionVisibleProperty
      }, {
        content: new Text( movableLineString, {
          font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'movableLineString' )
        } ),
        property: model.movableLineVisibleProperty
      }, {
        content: new Text( periodTraceString, {
          font: MassesAndSpringsConstants.TITLE_FONT, tandem: tandem.createTandem( 'periodTraceString' )
        } ),
        property: model.firstSpring.periodTraceVisibilityProperty
      } ], {
        boxWidth: 15,
        spacing: 8,
        tandem: tandem.createTandem( 'indicatorVisibilityCheckboxGroup' )
      } );
    }
    var titleToControlsVerticalSpace = 2; //REVIEW: Can this be inlined?
    var indicatorVisibilityControlsVBox = new VBox( {
        children: [
          new VStrut( titleToControlsVerticalSpace ),
          indicatorVisibilityCheckboxGroup
        ],
        align: 'left',
        tandem: tandem.createTandem( 'indicatorVisibilityControlsVBox' )
      }
    );
    var lineVBox = new VBox( {
      children: [
        displacementSymbol,
        new VStrut( 18 ),
        blueLine,
        new VStrut( 24 ),
        blackLine,
        new VStrut( 24 ),
        redLine
      ], yMargin: 0
    } );
    if ( options.periodTraceOption ) {
      lineVBox = new VBox( {
        children: [
          displacementSymbol,
          new VStrut( 18 ),
          blueLine,
          new VStrut( 24 ),
          blackLine,
          new VStrut( 24 ),
          redLine,
          new VStrut( 24 ),
          grayLine
        ], yMargin: 0
      } );
    }
    var controlBox = new HBox( {
      children: [
        indicatorVisibilityControlsVBox,
        new HStrut( 25 ), //REVIEW: Use spacing instead?
        lineVBox,
      ]
    } );
    this.addChild( controlBox );
  }

  massesAndSprings.register( 'IndicatorVisibilityControlNode', IndicatorVisibilityControlNode );

  return inherit( Node, IndicatorVisibilityControlNode );
} );