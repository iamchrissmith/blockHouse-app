
var assert = require('assert');
var http = require('http');
var request = require('supertest');

var bodyParser = require('..');

describe('bodyParser.urlencoded()', function(){
  var server
  before(function(){
    server = createServer()
  })

  it('should support all http methods', function(done){
    request(server)
    .get('/')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Content-Length', 'user=tobi'.length)
    .send('user=tobi')
    .expect(200, '{"user":"tobi"}', done)
  })

  it('should parse x-www-form-urlencoded', function(done){
    request(server)
    .post('/')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('user=tobi')
    .expect(200, '{"user":"tobi"}', done)
  })

  it('should 400 when invalid content-length', function(done){
    var server = createServer({ limit: '1kb' })

    var test = request(server).post('/')
    test.set('Content-Type', 'application/x-www-form-urlencoded')
    test.set('Content-Length', '20')
    test.set('Transfer-Encoding', 'chunked')
    test.write('str=')
    test.expect(400, /content length/, done)
  })

  it('should handle empty message-body', function(done){
    var server = createServer({ limit: '1kb' })

    request(server)
    .post('/')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Transfer-Encoding', 'chunked')
    .send('')
    .expect(200, '{}', done)
  })

  it('should parse extended syntax', function(done){
    request(server)
    .post('/')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('user[name][first]=Tobi')
    .expect(200, '{"user":{"name":{"first":"Tobi"}}}', done)
  })

  describe('with extended option', function(){
    describe('when false', function(){
      var server;
      before(function(){
        server = createServer({ extended: false })
      })

      it('should not parse extended syntax', function(done){
        request(server)
        .post('/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('user[name][first]=Tobi')
        .expect(200, '{"user[name][first]":"Tobi"}', done)
      })
    })

    describe('when true', function(){
      var server;
      before(function(){
        server = createServer({ extended: true })
      })

      it('should parse extended syntax', function(done){
        request(server)
        .post('/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('user[name][first]=Tobi')
        .expect(200, '{"user":{"name":{"first":"Tobi"}}}', done)
      })
    })
  })

  describe('with inflate option', function(){
    describe('when false', function(){
      var server;
      before(function(){
        server = createServer({ inflate: false })
      })

      it('should not accept content-encoding', function(done){
        var test = request(server).post('/')
        test.set('Content-Encoding', 'gzip')
        test.set('Content-Type', 'application/x-www-form-urlencoded')
        test.write(new Buffer('1f8b080000000000000bcb4bcc4db57db16e170099a4bad608000000', 'hex'))
        test.expect(415, 'content encoding unsupported', done)
      })
    })

    describe('when true', function(){
      var server;
      before(function(){
        server = createServer({ inflate: true })
      })

      it('should accept content-encoding', function(done){
        var test = request(server).post('/')
        test.set('Content-Encoding', 'gzip')
        test.set('Content-Type', 'application/x-www-form-urlencoded')
        test.write(new Buffer('1f8b080000000000000bcb4bcc4db57db16e170099a4bad608000000', 'hex'))
        test.expect(200, '{"name":"论"}', done)
      })
    })
  })

  describe('with limit option', function(){
    it('should 413 when over limit with Content-Length', function(done){
      var buf = new Buffer(1024)
      var server = createServer({ limit: '1kb' })

      buf.fill('.')

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Content-Length', '1028')
      .send('str=' + buf.toString())
      .expect(413, done)
    })

    it('should 413 when over limit with chunked encoding', function(done){
      var buf = new Buffer(1024)
      var server = createServer({ limit: '1kb' })

      buf.fill('.')

      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.set('Transfer-Encoding', 'chunked')
      test.write('str=')
      test.write(buf.toString())
      test.expect(413, done)
    })

    it('should accept number of bytes', function(done){
      var buf = new Buffer(1024)
      var server = createServer({ limit: 1024 })

      buf.fill('.')

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('str=' + buf.toString())
      .expect(413, done)
    })

    it('should not change when options altered', function(done){
      var buf = new Buffer(1024)
      var options = { limit: '1kb' }
      var server = createServer(options)

      buf.fill('.')
      options.limit = '100kb'

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('str=' + buf.toString())
      .expect(413, done)
    })

    it('should not hang response', function(done){
      var buf = new Buffer(1024 * 10)
      var server = createServer({ limit: '1kb' })

      buf.fill('.')

      var server = createServer({ limit: '8kb' })
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(buf)
      test.write(buf)
      test.write(buf)
      test.expect(413, done)
    })
  })

  describe('with type option', function(){
    var server;
    before(function(){
      server = createServer({ type: 'application/vnd+x-www-form-urlencoded' })
    })

    it('should parse for custom type', function(done){
      request(server)
      .post('/')
      .set('Content-Type', 'application/vnd+x-www-form-urlencoded')
      .send('user=tobi')
      .expect(200, '{"user":"tobi"}', done)
    })

    it('should ignore standard type', function(done){
      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('user=tobi')
      .expect(200, '{}', done)
    })
  })

  describe('with verify option', function(){
    it('should assert value if function', function(){
      var err;

      try {
        var server = createServer({ verify: 'lol' })
      } catch (e) {
        err = e;
      }

      assert.ok(err);
      assert.equal(err.name, 'TypeError');
    })

    it('should error from verify', function(done){
      var server = createServer({verify: function(req, res, buf){
        if (buf[0] === 0x20) throw new Error('no leading space')
      }})

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(' user=tobi')
      .expect(403, 'no leading space', done)
    })

    it('should allow custom codes', function(done){
      var server = createServer({verify: function(req, res, buf){
        if (buf[0] !== 0x20) return
        var err = new Error('no leading space')
        err.status = 400
        throw err
      }})

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(' user=tobi')
      .expect(400, 'no leading space', done)
    })

    it('should allow pass-through', function(done){
      var server = createServer({verify: function(req, res, buf){
        if (buf[0] === 0x5b) throw new Error('no arrays')
      }})

      request(server)
      .post('/')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send('user=tobi')
      .expect(200, '{"user":"tobi"}', done)
    })
  })

  describe('charset', function(){
    var server;
    before(function(){
      server = createServer()
    })

    it('should parse utf-8', function(done){
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      test.write(new Buffer('6e616d653de8aeba', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should parse when content-length != char length', function(done){
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      test.set('Content-Length', '7')
      test.write(new Buffer('746573743dc3a5', 'hex'))
      test.expect(200, '{"test":"å"}', done)
    })

    it('should default to utf-8', function(done){
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('6e616d653de8aeba', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should fail on unknown charset', function(done){
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded; charset=koi8-r')
      test.write(new Buffer('6e616d653dcec5d4', 'hex'))
      test.expect(415, 'unsupported charset', done)
    })
  })

  describe('encoding', function(){
    var server;
    before(function(){
      server = createServer({ limit: '10kb' })
    })

    it('should parse without encoding', function(done){
      var test = request(server).post('/')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('6e616d653de8aeba', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should support identity encoding', function(done){
      var test = request(server).post('/')
      test.set('Content-Encoding', 'identity')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('6e616d653de8aeba', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should support gzip encoding', function(done){
      var test = request(server).post('/')
      test.set('Content-Encoding', 'gzip')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('1f8b080000000000000bcb4bcc4db57db16e170099a4bad608000000', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should support deflate encoding', function(done){
      var test = request(server).post('/')
      test.set('Content-Encoding', 'deflate')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('789ccb4bcc4db57db16e17001068042f', 'hex'))
      test.expect(200, '{"name":"论"}', done)
    })

    it('should fail on unknown encoding', function(done){
      var test = request(server).post('/')
      test.set('Content-Encoding', 'nulls')
      test.set('Content-Type', 'application/x-www-form-urlencoded')
      test.write(new Buffer('000000000000', 'hex'))
      test.expect(415, 'unsupported content encoding', done)
    })
  })
})

function createServer(opts){
  var _bodyParser = bodyParser.urlencoded(opts)

  return http.createServer(function(req, res){
    _bodyParser(req, res, function(err){
      res.statusCode = err ? (err.status || 500) : 200;
      res.end(err ? err.message : JSON.stringify(req.body));
    })
  })
}
