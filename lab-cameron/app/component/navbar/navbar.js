'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controllerAs: 'navbarCtrl',
  controller: [
    '$log',
    '$location',
    '$rootScope',
    'authService',
    NavbarController,
  ],
};

function NavbarController($log, $location, $rootScope, authService) {
  this.$onInit = () => {
    $log.debug('NavbarController');

    this.checkPath = function() {
      let path = $location.path();
      if (path === '/join') {
        this.hideButtons = true;
      }
      if (path !== '/join') {
        this.hideButtons = false;
        authService.getToken()
        .catch(() => {
          $location.url('/join#login');
        });
      }
    };

    this.checkPath();

    $rootScope.$on('$locationChangeSuccess', () => {
      this.checkPath();
    });

    this.logout = function() {
      $log.debug('navbarCtrl.logout()');
      this.hideButtons = true;
      authService.logout()
      .then(() => $location.url('/'));
    };
  };
}
