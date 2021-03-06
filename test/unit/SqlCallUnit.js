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
const { SqlCall } = require('../../lib/itoolkit');

describe('SqlCall Class Unit Tests', () => {
  describe('constructor', () => {
    it('creates returns an instance of SqlCall', () => {
      const sql = new SqlCall();

      expect(sql).to.be.instanceOf(SqlCall);
    });
  });
  describe('toXML', () => {
    it('returns current sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql></sql>';

      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('addQuery', () => {
    it('appends query with error is on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><query error=\'on\'>select * from QIWS.QCUSTCDT</query></sql>';

      sql.addQuery('select * from QIWS.QCUSTCDT', { error: 'on' });

      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends query with options object to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><query error=\'fast\'>select * from QIWS.QCUSTCDT</query></sql>';

      sql.addQuery('select * from QIWS.QCUSTCDT');

      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('fetch', () => {
    it('appends fetch without options object to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><fetch block=\'all\' desc=\'on\'></fetch></sql>';

      sql.fetch();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends fetch with block is 10 to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><fetch block=\'10\' desc=\'on\'></fetch></sql>';

      sql.fetch({ block: '10' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends fetch with desc is off to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><fetch block=\'all\' desc=\'off\'></fetch></sql>';

      sql.fetch({ desc: 'off' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends fetch with error is on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><fetch block=\'all\' desc=\'on\' error=\'on\'></fetch></sql>';

      sql.fetch({ error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('commit', () => {
    it('appends commit with action commit to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><commit action=\'commit\'></commit></sql>';

      sql.commit({ action: 'commit' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends commit with action rollback to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><commit action=\'rollback\'></commit></sql>';

      sql.commit({ action: 'rollback' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends commit without action to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql></sql>';

      sql.commit();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends commit with error is on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><commit action=\'commit\' error=\'on\'></commit></sql>';

      sql.commit({ action: 'commit', error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('prepare', () => {
    it('appends prepare to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><prepare error=\'fast\'>SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?</prepare></sql>';

      sql.prepare('SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?');
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends prepare with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><prepare error=\'on\'>SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?</prepare></sql>';

      sql.prepare('SELECT * FROM QIWS.QCUSTCDT WHERE BALDUE > ?', { error: 'on'});
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });

  describe('execute', () => {
    it('appends execute with parameters to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><execute error=\'fast\'><parm io=\'in\'>30</parm></execute></sql>';

      sql.execute([[30, 'in']]);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends execute with parameters and error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><execute error=\'on\'><parm io=\'in\'>30</parm></execute></sql>';

      sql.execute([[30, 'in']], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends execute without parameters to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><execute error=\'fast\'></execute></sql>';

      sql.execute();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends execute without parameters and error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><execute error=\'on\'></execute></sql>';

      sql.execute(null, { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('connect', () => {
    it('appends connect to sql XML', () => {
      const sql = new SqlCall();


      const expectedXML = '<sql><connect db=\'local\' uid=\'me\' pwd=\'mypass\' options=\'opt1\'></connect></sql>';

      sql.connect({ db: 'local', uid: 'me', pwd: 'mypass' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('setOptions', () => {
    it('appends options to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><options autocommit=\'on\' naming=\'system\'></options></sql>';

      sql.setOptions([{ desc: 'autocommit', value: 'on' },
        { desc: 'naming', value: 'system' }]);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends options without options object to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql></sql>';

      sql.setOptions();
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('tables', () => {
    it('appends tables to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><tables><parm></parm><parm>QIWS</parm><parm></parm><parm></parm></tables></sql>';
      // catalog, schema, table, table type
      sql.tables(['', 'QIWS', '', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends tables with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><tables error=\'on\'><parm></parm><parm>QIWS</parm><parm></parm><parm></parm></tables></sql>';
      // catalog, schema, table, table type
      sql.tables(['', 'QIWS', '', ''], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('tablePriv', () => {
    it('appends tablepriv to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><tablepriv><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm></tablepriv></sql>';
      // catalog, schema, table
      sql.tablePriv(['', 'QIWS', 'QCUSTCDT']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends tablepriv with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><tablepriv error=\'on\'><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm></tablepriv></sql>';
      // catalog, schema, table
      sql.tablePriv(['', 'QIWS', 'QCUSTCDT'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('columns', () => {
    it('appends columns to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><columns><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columns></sql>';
      // catalog, schema, table, column
      sql.columns(['', 'QIWS', 'QCUSTCDT', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends columns with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><columns error=\'on\'><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columns></sql>';
      // catalog, schema, table, column
      sql.columns(['', 'QIWS', 'QCUSTCDT', ''], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('columnPriv', () => {
    it('appends columnpriv to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><columnpriv><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columnpriv></sql>';
      // catalog, schema, table, column
      sql.columnPriv(['', 'QIWS', 'QCUSTCDT', '']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends columnpriv with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><columnpriv error=\'on\'><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm></parm></columnpriv></sql>';
      // catalog, schema, table, column
      sql.columnPriv(['', 'QIWS', 'QCUSTCDT', ''], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('procedures', () => {
    it('appends procedures to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><procedures><parm></parm><parm>QSYS2</parm><parm>TCPIP_INFO</parm></procedures></sql>';
      // catalog, schema, procedure
      sql.procedures(['', 'QSYS2', 'TCPIP_INFO']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends procedures with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><procedures error=\'on\'><parm></parm><parm>QSYS2</parm><parm>TCPIP_INFO</parm></procedures></sql>';
      // catalog, schema, procedure
      sql.procedures(['', 'QSYS2', 'TCPIP_INFO'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('pColumns', () => {
    it('appends pColumns to sql XML', () => {
      // procedure columns:
      const sql = new SqlCall();

      const expectedXML = '<sql><pcolumns><parm></parm><parm>QSYS2</parm><parm>QCMDEXC</parm><parm>COMMAND</parm></pcolumns></sql>';
      // catalog, schema, procedure, column
      sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends pColumns with error on to sql XML', () => {
      // procedure columns:
      const sql = new SqlCall();

      const expectedXML = '<sql><pcolumns error=\'on\'><parm></parm><parm>QSYS2</parm><parm>QCMDEXC</parm><parm>COMMAND</parm></pcolumns></sql>';
      // catalog, schema, procedure, column
      sql.pColumns(['', 'QSYS2', 'QCMDEXC', 'COMMAND'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('primaryKeys', () => {
    it('appends primarykeys to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><primarykeys><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></primarykeys></sql>';
      // catalog, schema, table
      sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends primarykeys with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><primarykeys error=\'on\'><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></primarykeys></sql>';
      // catalog, schema, table
      sql.primaryKeys(['', 'QUSRSYS', 'QASZRAIRX'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('foreignKeys', () => {
    it('appends foreignkeys to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><foreignkeys><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRC</parm><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></foreignkeys></sql>';

      // pk: catalog, schema, table
      // fk: catalog, schema, table
      sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends foreignkeys with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><foreignkeys error=\'on\'><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRC</parm><parm></parm><parm>QUSRSYS</parm><parm>QASZRAIRX</parm></foreignkeys></sql>';

      // pk: catalog, schema, table
      // fk: catalog, schema, table
      sql.foreignKeys(['', 'QUSRSYS', 'QASZRAIRC', '', 'QUSRSYS', 'QASZRAIRX'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('statistics', () => {
    it('appends statistics to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><statistics><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>all</parm></statistics></sql>';
      // catalog, schema, table, all | unique
      sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends statistics with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><statistics error=\'on\'><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>all</parm></statistics></sql>';
      // catalog, schema, table, all | unique
      sql.statistics(['', 'QIWS', 'QCUSTCDT', 'all'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('special', () => {
    it('appends special to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><special><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>row</parm><parm>no</parm></special></sql>';
      // catalog, schema, table, row | transaction | session, no | unique
      sql.special(['', 'QIWS', 'QCUSTCDT', 'row', 'no']);
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends special with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><special error=\'on\'><parm></parm><parm>QIWS</parm><parm>QCUSTCDT</parm><parm>row</parm><parm>no</parm></special></sql>';
      // catalog, schema, table, row | transaction | session, no | unique
      sql.special(['', 'QIWS', 'QCUSTCDT', 'row', 'no'], { error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('count', () => {
    it('appends count to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><count desc=\'both\'></count></sql>';
      sql.count({ desc: 'both' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends count without options object to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><count desc=\'both\'></count></sql>';
      sql.count();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends count with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><count desc=\'both\' error=\'on\'></count></sql>';
      sql.count({ error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('rowCount', () => {
    it('appends rowcount to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><rowcount></rowcount></sql>';
      sql.rowCount();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends rowcount with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><rowcount error=\'on\'></rowcount></sql>';
      sql.rowCount({ error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('free', () => {
    it('appends free to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><free></free></sql>';
      sql.free();
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
  describe('describe', () => {
    it('appends describe to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><describe desc=\'both\'></describe></sql>';

      sql.describe({ desc: 'both' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends describe without options object to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><describe desc=\'both\'></describe></sql>';

      sql.describe();
      expect(sql.toXML()).to.equal(expectedXML);
    });
    it('appends describe with error on to sql XML', () => {
      const sql = new SqlCall();

      const expectedXML = '<sql><describe desc=\'both\' error=\'on\'></describe></sql>';

      sql.describe({ error: 'on' });
      expect(sql.toXML()).to.equal(expectedXML);
    });
  });
});
