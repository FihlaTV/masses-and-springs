// Copyright 2017-2020, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Denzell Barnett
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const Line = require( 'SCENERY/nodes/Line' );
  const massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  const MassesAndSpringsColorProfile = require( 'MASSES_AND_SPRINGS/common/view/MassesAndSpringsColorProfile' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );

  const MassesAndSpringsConstants = {
    DEFAULT_SPRING_LENGTH: 0.5,
    RADIO_BUTTON_RADIUS: 6,

    // Ratio for dt when sim is in slow motion
    SLOW_SIM_DT_RATIO: 8,

    // Y position of floor in meters. The floor is at the bottom bounds of the screen.
    FLOOR_Y: 0,

    // Y position of ceiling (meters). The ceiling is the top of the SpringHangerNode,
    // just below the top of the dev view bounds
    CEILING_Y: 1.47,

    // Shelf height, in meters, from the bottom and top of the shelf.
    SHELF_HEIGHT: 0.02,

    // Hook height in meters. Measured from the bottom of the hook not the screen
    HOOK_HEIGHT: 0.037,

    // Center of the hook. Used as an attachment point for the massNodes
    HOOK_CENTER: 0.037 / 2,

    // {RangeWithValue} range of damping associated with sim
    DAMPING_RANGE: new RangeWithValue( 0, 0.7, 0.3 ),

    // {RangeWithValue} range of gravitational acceleration associated with each planet
    GRAVITY_RANGE: new RangeWithValue( 0, 30, 9.8 ),

    // {RangeWithValue} range of gravitational acceleration associated with each planet
    SPRING_CONSTANT_RANGE: new RangeWithValue( 3, 12, 6 ),

    // Constants for vectors
    VELOCITY_ARROW_COLOR: MassesAndSpringsColorProfile.velocityVectorProperty,
    ACCELERATION_ARROW_COLOR: MassesAndSpringsColorProfile.accelerationVectorProperty,
    GRAVITY_ARROW_COLOR: 'rgb( 236, 63, 71 )',
    SPRING_ARROW_COLOR: 'rgb( 36, 36, 255 )',

    // Constants for planets' gravity
    EARTH_GRAVITY: 9.8,
    MOON_GRAVITY: 1.6,
    JUPITER_GRAVITY: 24.8,
    PLANET_X: 14.2,

    // Constants regarding fonts
    LABEL_FONT: new PhetFont( 12 ),
    TITLE_FONT: new PhetFont( 14 ),
    LEGEND_ABBREVIATION_FONT: new PhetFont( { size: 16, weight: 'bold' } ),
    LEGEND_DESCRIPTION_FONT: new PhetFont( 16 ),

    // Constants regarding panels
    PANEL_VERTICAL_SPACING: 10,
    PANEL_CORNER_RADIUS: 5,
    PANEL_MAX_WIDTH: 175,
    PANEL_MIN_WIDTH: 190,
    PANEL_FILL: '#EEEEEE',
    THUMB_HIGHLIGHT: '#71EDFF',

    // Enumerations
    SIM_SPEED_CHOICE: Enumeration.byKeys( [ 'NORMAL', 'SLOW' ] ),
    FORCES_MODE_CHOICE: Enumeration.byKeys( [ 'FORCES', 'NET_FORCES' ] ),
    SCENE_MODE_ENUM: Enumeration.byKeys( [ 'SAME_LENGTH', 'ADJUSTABLE_LENGTH' ] ),
    CONSTANT_MODE_ENUM: Enumeration.byKeys( [ 'SPRING_CONSTANT', 'SPRING_THICKNESS' ] ),

    /**
     * Creates line for visual representation within the panel.
     * @param {number} length
     * @returns {Line}
     */
    LINE_SEPARATOR: function( length ) {
      return new Line( 0, 0, length, 0, { stroke: 'gray' } );
    },

    /**
     * Creates line for visual representation within the panel.
     * @param {string} color
     * @param {Tandem} tandem
     * @returns {Line}
     */
    CREATE_LINE_ICON: function( color, tandem ) {
      return new Line( 0, 0, 25, 0, {
        stroke: color,
        lineDash: [ 6, 2.5 ],
        lineWidth: 2.0,
        cursor: 'pointer',
        tandem: tandem
      } );
    },

    // {number} X position of the spring node in screen coordinates
    RIGHT_SPRING_X: 1.3,
    LEFT_SPRING_X: 1.0,
    SPRING_X: 1.2
  };

  massesAndSprings.register( 'MassesAndSpringsConstants', MassesAndSpringsConstants );

  return MassesAndSpringsConstants;
} );