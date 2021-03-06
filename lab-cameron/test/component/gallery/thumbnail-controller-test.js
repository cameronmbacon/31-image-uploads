'use strict';

const expect = require('chai').expect;

describe('THumbnail Controller', function() {
  beforeEach(done => {
    angular.mock.module('slugram');
    angular.mock.inject(($rootScope, $window, $httpBackend, $componentController, picService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.$componentController = $componentController;
      this.picService = picService;

      this.mockBindings = {
        pic: {
          name: 'one',
          desc: 'one',
          file: 'fileOne',
          _id: '1234',
        },
        gallery :{
          name: 'one',
          desc: 'one',
          _id: '5678',
        },
      };

      this.$window.localStorage.token = 'test token';
      this.scope = this.$rootScope.$new();
      this.thumbnailCtrl = this.$componentController(
        'thumbnail',
        {
          scope: this.scope,
          picService: this.picService,
        },
        this.mockBindings
      );
      this.thumbnailCtrl.$onInit();
      done();
    });
  });
  afterEach(done => {
    delete this.thumbnailCtrl;
    delete this.$window.localStorage.token;
    done();
  });

  describe('Functional methods', () => {
    beforeEach(done => {
      this.expectUrl = 'http://localhost:3000/api/gallery/5678/pic/1234';
      this.expectHeaders = {
        Accept: 'application/json',
        Authorization: `Bearer ${this.$window.localStorage.token}`,
      };
      done();
    });

    describe('#thumbnailCtrl.deletePic', () => {
      it('should accept a valid DELETE request', done => {
        this.$httpBackend.expectDELETE(this.expectUrl, this.expectHeaders)
        .respond(204);
        this.thumbnailCtrl.deletePic();
        done();
      });
    });
  });
});
