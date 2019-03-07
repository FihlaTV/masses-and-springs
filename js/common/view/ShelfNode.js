// Copyright 2017-2019, University of Colorado Boulder

/**
 * Shelf used to house the masses when they are not being dragged or attached to a spring
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ShelfNode( tandem, options ) {
    options = _.extend( {
      fill: '#e6c29a',
      stroke: 'black',
      rectHeight: 10,
      rectX: 6,
      rectWidth: 280,
      tandem: tandem
    }, options );
    Rectangle.call( this, options );
  }

  massesAndSprings.register( 'ShelfNode', ShelfNode );

  return inherit( Rectangle, ShelfNode );
} );