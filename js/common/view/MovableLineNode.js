// Copyright 2016-2017, University of Colorado Boulder

/**
 * Node for the reference line and laser pointer node.
 *
 * @author Matt Pennington
 * @author Denzell Barnett
 */

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} initialPosition - of the center of line
   * @param {number} length - in view coordinates
   * @param {boolean} visibleProperty
   * @constructor
   */
  function MovableLineNode( initialPosition, length, visibleProperty ) {
    var self = this;
    Node.call( this );
    // Creates laser pointer tip for reference line
    this.laserEnabledProperty = new Property( null );
    var laserPointerNode = new LaserPointerNode( this.laserEnabledProperty, {
      bodySize: new Dimension2( 12, 14 ),
      nozzleSize: new Dimension2( 8, 9 ),
      cornerRadius: 1,
      hasButton: false,
        buttonRadius: 5,
      buttonTouchAreaDilation: 10
      }
    );
    this.addChild( laserPointerNode );

    var line = new Line( 0, 0, length, 0, {
      stroke: 'red',
      lineDash: [ 12, 8 ],
      lineWidth: 1.5,
      cursor: 'pointer'
    } );
    line.mouseArea = line.localBounds.dilated( 10 );
    line.touchArea = line.localBounds.dilated( 10 );

    // @private
    initialPosition.setX( 330 );
    this.positionProperty = new Property( initialPosition );
    this.positionProperty.link( function( position ) {
      self.translation = position.minus( new Vector2( length / 2, 0 ) );
    } );

    this.addInputListener( new MovableDragHandler( this.positionProperty, {
      dragBounds: new Bounds2( 330, 75, 330, 410 ) // done so reference line is only draggable on the y-axis
    } ) );

    visibleProperty.linkAttribute( self, 'visible' );

    this.addChild( line );
  }

  massesAndSprings.register( 'MovableLineNode', MovableLineNode );

  return inherit( Node, MovableLineNode, {
    reset: function() {
      this.positionProperty.reset();
    }
  } );

} );