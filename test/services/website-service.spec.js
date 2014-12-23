var WebsiteService = require('../../app/services/website-service.js'),
    assert = require("assert"),
    should = require('should');

describe('A website-service', function () {

  it('should extact a websites titles', function (done) {
    should.exist(WebsiteService.extractTitlesFrom);

    WebsiteService
        .extractTitlesFrom('http://www.abakia.de/')
//        .extractTitlesFrom('http://www.risu.io/')
        .then(assertTitles)
        .done(done);

    function assertTitles(titles) {
      titles.length.should.be.greaterThan(0);
      titles.indexOf('Dennis Wilson / Software Developer / Dortmund').should.equal(0);
    }
  });

  it('should parse website tags', function (done) {
    should.exist(WebsiteService.extractTagsFrom);

    WebsiteService
        .extractTagsFrom('http://www.abakia.de/')
//        .extractTagsFrom('http://www.risu.io/')
        .then(assertTags)
        .done(done);

    function assertTags(tags) {
      tags.length.should.be.greaterThan(0);
    }
  });

});

