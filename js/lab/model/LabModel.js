// Copyright 2016-2017, University of Colorado Boulder

/**
 * Energy model (base type) for Masses and Springs
 *
 * @author Matt Pennington (PhET Interactive Simulations)
 * @author Denzell Barnett (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var massesAndSprings = require( 'MASSES_AND_SPRINGS/massesAndSprings' );
  var MassesAndSpringsModel = require( 'MASSES_AND_SPRINGS/common/model/MassesAndSpringsModel' );

  /**
   * TODO:: document all properties and items set on objects (entire sim)
   * @constructor
   */
  function LabModel( tandem ) {
    MassesAndSpringsModel.call( this, tandem, { springCount: 1, showVectors: true } );

    var redMass = this.createMass( .125, .12, true, 'red', '?', tandem.createTandem( 'redLabeledMass' ) );
    var greenMass = this.createMass( .150, .14, true, 'green', '?', tandem.createTandem( 'greenLabeledMass' ) );
    // REVIEW: I don't know why but bracket notation doesn't work for this. ( this.masses[redMass]=redMass)
    this.masses.redMass = redMass;
    this.masses.greenMass = greenMass;
    debugger;
  }

  massesAndSprings.register( 'LabModel', LabModel );

  return inherit( MassesAndSpringsModel, LabModel );
} );