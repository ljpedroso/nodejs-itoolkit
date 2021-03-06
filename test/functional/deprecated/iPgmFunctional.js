// Copyright (c) International Business Machines Corp. 2019
// All Rights Reserved

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-env mocha */
/* eslint-disable new-cap */

const { expect } = require('chai');
const { iPgm, xmlToJson } = require('../../../lib/itoolkit');
const { returnTransportsDeprecated } = require('../../../lib/utils');

// Set Env variables or set values here.
const opt = {
  database: process.env.TKDB || '*LOCAL',
  username: process.env.TKUSER || '',
  password: process.env.TKPASS || '',
  host: process.env.TKHOST || 'localhost',
  port: process.env.TKPORT || 80,
  path: process.env.TKPATH || '/cgi-bin/xmlcgi.pgm',
};


const transports = returnTransportsDeprecated(opt);

describe('iPgm Functional Tests', () => {
  describe('Test iPgm()', () => {
    transports.forEach((transport) => {
      it(`calls QWCRSVAL program checks if it ran successfully using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const program = new iPgm('QWCRSVAL', { lib: 'QSYS' });

        const outBuf = [
          [0, '10i0'],
          [0, '10i0'],
          ['', '36h'],
          ['', '10A'],
          ['', '1A'],
          ['', '1A'],
          [0, '10i0'],
          [0, '10i0'],
        ];
        program.addParam(outBuf, { io: 'out' });
        program.addParam(66, '10i0');
        program.addParam(1, '10i0');
        program.addParam('QCCSID', '10A');
        program.addParam(this.errno, { io: 'both', len: 'rec2' });
        connection.add(program);
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);

          results.forEach((result) => {
            expect(result.success).to.equal(true);
          });
          done();
        });
      });
    });
  });


  describe('Test iPgm()', () => {
    transports.forEach((transport) => {
      it(`calls QWCRSVAL program and returns arbitrarily named parameter using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const program = new iPgm('QWCRSVAL', { lib: 'QSYS' });

        const outBuf = [
          [0, '10i0'],
          [0, '10i0'],
          ['', '36h'],
          ['', '10A'],
          ['', '1A'],
          ['', '1A'],
          [0, '10i0'],
          [0, '10i0'],
        ];
        program.addParam(outBuf, { io: 'out' });
        program.addParam(66, '10i0');
        program.addParam(1, '10i0');
        program.addParam('QCCSID', '10A');
        const paramValue = 'errno';

        program.addParam(this.errno, { io: 'both', len: 'rec2', name: paramValue });
        connection.add(program);
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);

          results.forEach((result) => {
            expect(result.success).to.equal(true);
          });
          done();
        });
      });
    });
  });

  describe.skip('Test iPgm()', () => {
    // Skip for now ZZSRV6 program requires XMLSERVICE built with tests
    // Refer to test/rpg/zzsrv6.rpgle
    transports.forEach((transport) => {
      it.skip(`Should be successful with addReturn arbitrary attribute specified using using ${transport.name} transport`, (done) => {
        const connection = transport.me;

        const program = new iPgm('ZZSRV6', { lib: 'XMLSERVICE', func: 'ZZVARY4' });

        program.addParam('Gill', '10A', { letying: '4' });
        const testValue = 'NEW_NAME';
        program.addReturn('0', '20A', { letying: '4', name: testValue });
        connection.add(program);
        connection.run((xmlOut) => {
          const results = xmlToJson(xmlOut);

          expect(results[0].data[1].name).to.equal(testValue);
          done();
        });
      });
    });
  });
});
