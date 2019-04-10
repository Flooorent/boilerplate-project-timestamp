const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp).should()

describe('/api/timestamp', function() {
    const timestamp = 1553336730000
    const utc = 'Sat, 23 Mar 2019 10:25:30 GMT'

    it('should handle unix timestamp', function(done) {
        chai.request(app)
            .get(`/api/timestamp/${timestamp}`)
            .end(function(err, res) {
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('unix')
                res.body.should.have.property('utc')
                res.body.unix.should.equal(timestamp)
                res.body.utc.should.equal(utc)
                done()
            })
    })
    
    it('should handle date strings compliant with ISO-8601', function(done) {
        chai.request(app)
            .get(`/api/timestamp/${utc}`)
            .end(function(err, res) {
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('unix')
                res.body.should.have.property('utc')
                res.body.unix.should.equal(timestamp)
                res.body.utc.should.equal(utc)
                done()
            })
    })

    // TODO: improve test to retrieve correct timestamp
    it('should return the current timestamp if empty string', function(done) {
        chai.request(app)
            .get('/api/timestamp')
            .end(function(err, res) {
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('unix')
                res.body.should.have.property('utc')
                done()
            })
    })

    it('should return error JSON if invalid date string', function(done) {
        chai.request(app)
            .get('/api/timestamp/jean')
            .end(function(err, res) {
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                res.body.error.should.equal('Invalid Date')
                done()
            })
    })
})
