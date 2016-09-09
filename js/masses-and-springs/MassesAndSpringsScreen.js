// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/masses-and-springs/model/MassesAndSpringsModel' );
  var MassesAndSpringsScreenView = require( 'MASSES_AND_SPRINGS/masses-and-springs/view/MassesAndSpringsScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );

  /**
   * @constructor
   */
  function MassesAndSpringsScreen() {
    Screen.call( this,
      function() { return new MassesAndSpringsModel(); },
      function( model ) { return new MassesAndSpringsScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  massesAndSprings.register( 'MassesAndSpringsScreen', MassesAndSpringsScreen );

  return inherit( Screen, MassesAndSpringsScreen );
} );