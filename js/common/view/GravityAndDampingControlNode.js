// Copyright 2017-2019, University of Colorado Boulder

/**
 * Node for the gravity control panel and combo box for planet gravity options.
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Body = require( 'MASSES_AND_SPRINGS/common/model/Body' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const GravityComboBox = require( 'MASSES_AND_SPRINGS/common/view/GravityComboBox' );
  const HSlider = require( 'SUN/HSlider' );
  const inherit = require( 'PHET_CORE/inherit' );
  const massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  const MassesAndSpringsConstants = require( 'MASSES_AND_SPRINGS/common/MassesAndSpringsConstants' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberControl = require( 'SCENERY_PHET/NumberControl' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SunConstants = require( 'SUN/SunConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const dampingEqualsZeroString = require( 'string!MASSES_AND_SPRINGS/dampingEqualsZero' );
  const dampingString = require( 'string!MASSES_AND_SPRINGS/damping' );
  const gravityString = require( 'string!MASSES_AND_SPRINGS/gravity' );
  const gravityValueString = require( 'string!MASSES_AND_SPRINGS/gravityValue' );
  const lotsString = require( 'string!MASSES_AND_SPRINGS/lots' );
  const noneString = require( 'string!MASSES_AND_SPRINGS/none' );
  const whatIsTheValueOfGravityString = require( 'string!MASSES_AND_SPRINGS/whatIsTheValueOfGravity' );

  // constants
  const SPACING = 7;
  const MAX_WIDTH = 80;

  /**
   * @param {MassesAndSpringsModel} model
   * @param {Node} listNodeParent
   * @param {Tandem} tandem
   * @param {Object} [options]
   *
   * @constructor
   */
  function GravityAndDampingControlNode( model, listNodeParent, tandem, options ) {
    options = merge( {
      useSliderLabels: true,
      dampingVisible: false
    }, options );

    // Manages the items associated with the gravity panel in a combo box
    const gravityComboBox = new GravityComboBox( model.bodyProperty, listNodeParent, tandem, {
      cornerRadius: 3,
      buttonYMargin: 0,
      itemYMargin: 3,
      itemXMargin: 2,
      listYMargin: 3,
      xOffset: 50,
      bodyMaxWidth: 160,
      tandem: tandem.createTandem( 'gravityComboBox' )
    } );

    const gravityProperty = model.gravityProperty;

    // Text that reads "What is the value of gravity?"
    const questionTextNode = new Node( {
      children: [ new Text( whatIsTheValueOfGravityString, {
        font: MassesAndSpringsConstants.TITLE_FONT
      } ) ]
    } );

    const gravityNumberControl = new NumberControl(
      gravityString,
      model.gravityProperty,
      MassesAndSpringsConstants.GRAVITY_RANGE, {
        xMargin: 0,
        yMargin: 0,
        includeArrowButtons: !options.useSliderLabels,
        layoutFunction: NumberControl.createLayoutFunction4( {
          sliderPadding: options.useTextSliderLabels ? 0 : 13,
          hasReadoutProperty: new DerivedProperty( [ model.bodyProperty ], function( body ) {
            return !options.useSliderLabels && (body !== Body.PLANET_X);
          } ),
          createBottomContent: function( bottomBox ) {

            const bottomContent = new Node( {
              children: [
                questionTextNode,
                bottomBox
              ]
            } );
            questionTextNode.maxWidth = bottomBox.width * 1.25;
            questionTextNode.center = bottomBox.center;
            questionTextNode.onStatic( 'visibility', function() {
              bottomBox.visible = !questionTextNode.visible;
            } );
            return bottomContent;
          }
        } ),
        delta: 0.1,

        // subcomponent options
        titleNodeOptions: {
          font: new PhetFont( { size: 14, weight: 'bold' } ),
          maxWidth: MAX_WIDTH * 1.5
        },
        numberDisplayOptions: {
          valuePattern: StringUtils.fillIn( gravityValueString, {
            gravity: SunConstants.VALUE_NAMED_PLACEHOLDER
          } ),
          font: new PhetFont( { size: 14 } ),
          useRichText: true,
          decimalPlaces: 1,
          maxWidth: MAX_WIDTH
        },
        sliderOptions: {
          majorTickLength: 10,
          trackSize: options.useSliderLabels ? new Dimension2( 125, 0.1 ) : new Dimension2( 115, 0.1 ),
          thumbSize: new Dimension2( 13, 22 ),
          thumbFill: '#00C4DF',
          thumbFillHighlighted: MassesAndSpringsConstants.THUMB_HIGHLIGHT,
          majorTicks: [
            {
              value: MassesAndSpringsConstants.GRAVITY_RANGE.min,
              label: new Text( options.useSliderLabels ? noneString : MassesAndSpringsConstants.GRAVITY_RANGE.min, {
                font: MassesAndSpringsConstants.LABEL_FONT,
                maxWidth: MAX_WIDTH
              } )
            },
            {
              value: MassesAndSpringsConstants.GRAVITY_RANGE.max,
              label: new Text( options.useSliderLabels ? lotsString : MassesAndSpringsConstants.GRAVITY_RANGE.max, {
                font: MassesAndSpringsConstants.LABEL_FONT,
                maxWidth: MAX_WIDTH
              } )
            }
          ]
        },
        arrowButtonOptions: {
          scale: 0.55,
          touchAreaXDilation: 22,
          touchAreaYDilation: 18
        }
      } );

    // Added logic for compatibility with Masses and Springs: Basics
    if ( !model.basicsVersion ) {
      if ( options.dampingVisible ) {

        // Creating title for damping hSlider
        const dampingHSliderTitle = new Text( dampingString, {
          font: new PhetFont( { size: 14, weight: 'bold' } ),
          maxWidth: MAX_WIDTH * 1.5,
          top: gravityComboBox.bottom + SPACING
        } );

        // {Range} Range for hSlider
        const dampingRange = MassesAndSpringsConstants.DAMPING_RANGE;

        // Creating damping hSlider
        const dampingHSlider = new HSlider( model.dampingProperty, dampingRange, {
          top: dampingHSliderTitle.bottom + SPACING * 3,
          left: dampingHSliderTitle.centerX,
          majorTickLength: 10,
          minorTickLength: 5,
          minorTickLineWidth: 0.5,
          trackSize: new Dimension2( 120, 0.1 ),
          thumbSize: new Dimension2( 13, 22 ),
          thumbFill: '#00C4DF',
          thumbFillHighlighted: MassesAndSpringsConstants.THUMB_HIGHLIGHT,
          align: 'center',
          constrainValue: function( value ) {
            value = Utils.roundSymmetric( value * 100 / 5.75 ) * 5.75;
            return value / 100;
          },
          tandem: tandem.createTandem( 'hSlider' )
        } );

        dampingHSlider.addMajorTick( dampingRange.min, new Text( noneString, {
          font: MassesAndSpringsConstants.LABEL_FONT,
          maxWidth: MAX_WIDTH
        } ) );
        dampingHSlider.addMajorTick( dampingRange.min + ( dampingRange.max - dampingRange.min ) / 2 );
        dampingHSlider.addMajorTick( dampingRange.max, new Text( lotsString, {
          font: MassesAndSpringsConstants.LABEL_FONT,
          maxWidth: MAX_WIDTH
        } ) );
        for ( let i = 1; i < 6; i++ ) {
          if ( i !== 3 ) {
            dampingHSlider.addMinorTick( dampingRange.min + i * ( dampingRange.max - dampingRange.min ) / 6 );
          }
        }

        var contentNode = new Node( {
          children: [
            gravityNumberControl,
            gravityComboBox,
            dampingHSliderTitle,
            dampingHSlider
          ],
          tandem: tandem.createTandem( 'gravityPropertyVBox' )
        } );

        // Content to be added to parent node
        Node.call( this, { children: [ contentNode ] } );

        // Alignment of Node contents for panel with damping
        gravityNumberControl.top = this.top;
        gravityNumberControl.centerX = this.centerX;
        gravityComboBox.top = gravityNumberControl.bottom + 10;
        gravityComboBox.centerX = gravityNumberControl.centerX;
        dampingHSliderTitle.leftTop = new Vector2( gravityNumberControl.left, gravityComboBox.bottom + 10 );
        dampingHSlider.centerX = gravityNumberControl.centerX;
        dampingHSlider.top = dampingHSliderTitle.bottom + 5;
      }
      else {

        // Creating text that reads Damping = 0
        const dampingEqualsZeroText = new Text( StringUtils.fillIn( dampingEqualsZeroString, {
          equalsZero: MathSymbols.EQUAL_TO + ' 0'
        } ), {
          font: MassesAndSpringsConstants.TITLE_FONT,
          maxWidth: MAX_WIDTH * 2,
          top: gravityComboBox.bottom + SPACING,
          centerX: gravityComboBox.centerX
        } );

        // Content to be added to parent node
        contentNode = new Node( {
          children: [
            gravityNumberControl,
            gravityComboBox,
            dampingEqualsZeroText
          ],
          tandem: tandem.createTandem( 'gravityPropertyVBox' )
        } );
        Node.call( this, { children: [ contentNode ] } );

        // Alignment of Node contents for panel without damping on intro and vector screen
        gravityComboBox.centerX = gravityNumberControl.centerX;
        gravityComboBox.top = gravityNumberControl.bottom + 10;
        dampingEqualsZeroText.leftTop = new Vector2( gravityNumberControl.left, gravityComboBox.bottom + 10 );
      }
    }
    else {

      // Content to be added to parent node
      contentNode = new Node( {
        children: [
          gravityNumberControl,
          gravityComboBox
        ],
        tandem: tandem.createTandem( 'gravityPropertyVBox' )
      } );
      Node.call( this, { children: [ contentNode ] } );

      // Alignment of Node contents for panel without damping on intro and vector screen
      gravityComboBox.centerX = gravityNumberControl.centerX;
      gravityComboBox.top = gravityNumberControl.bottom + 10;
    }

    // Responsible for managing bodies. Link exists for sim duration. No need to unlink.
    model.bodyProperty.link( function( newBody, oldBody ) {
      const body = _.find( Body.BODIES, newBody );

        // Set visibility of question node
        questionTextNode.visible = body === Body.PLANET_X;

        // If it's not custom, set it to its value
        if ( body !== Body.CUSTOM ) {
          gravityProperty.set( body.gravity );
        }
        else {
          // If we are switching from Planet X to Custom, don't let them cheat (go back to last custom value)
          if ( oldBody === Body.PLANET_X ) {
            gravityProperty.value = Body.CUSTOM.gravity;
          }

          // For non-Planet X, update our internal custom gravity
          else {
            Body.CUSTOM.gravity = gravityProperty.value;
          }
        }
      }
    );

    // change body to custom if gravity was changed by user using tweakers or slider
    model.gravityProperty.lazyLink( function( gravity ) {

      // Checks if the new gravity value is a gravity value of a body
      if ( !_.some( Body.BODIES, function( body ) { return body.gravity === gravity; } ) ) {
        model.bodyProperty.value = Body.CUSTOM;
      }
      if ( model.bodyProperty.value === Body.CUSTOM ) {
        Body.CUSTOM.gravity = gravity;
      }
    } );
    this.mutate( options );
  }

  massesAndSprings.register( 'GravityAndDampingControlNode', GravityAndDampingControlNode );

  return inherit( Node, GravityAndDampingControlNode );
} );