/**
 Copyright 2013-2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc module
 * @name  Architecture.architectures
 *
 * @description
 *   Module for activation keys related functionality.
 */
angular.module('Architectures.architectures', [
    'ngResource',
    'ui.router',
    'Bastion.utils',
    'Bastion.widgets'
]);

angular.module('Architectures.architectures').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('architectures', {
        abstract: true,
        controller: 'ArchitecturesController',
        templateUrl: 'architectures/views/architectures.html'
    })
    .state('architectures.index', {
        url: '/architectures',
        views: {
            'table': {
                templateUrl: 'architectures/views/architectures-table-full.html'
            }
        }
    })
    .state('architectures.new', {
        url: '/architectures/new',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'architectures/views/architectures-table-collapsed.html'
            },
            'action-panel': {
                controller: 'NewArchitectureController',
                templateUrl: 'architectures/new/views/architecture-new.html'
            }
        }
    });

    $stateProvider.state("architectures.details", {
        abstract: true,
        url: '/architectures/:architectureId',
        collapsed: true,
        views: {
            'table': {
                templateUrl: 'architectures/views/architectures-table-collapsed.html'
            },
            'action-panel': {
                controller: 'ArchitectureDetailsController',
                templateUrl: 'architectures/details/views/architecture-details.html'
            }
        }
    })
    .state('architectures.details.info', {
        url: '/info',
        collapsed: true,
        controller: 'ArchitectureDetailsInfoController',
        templateUrl: 'architectures/details/views/architecture-info.html'
    });

    $stateProvider.state('architectures.details.operating-systems', {
        abstract: true,
        collapsed: true,
        templateUrl: 'architectures/details/views/architecture-operating-systems.html'
    })
    .state('architectures.details.operating-systems.list', {
        url: '/operating-systems',
        collapsed: true,
        controller: 'ArchitectureOperatingSystemsController',
        templateUrl: 'architectures/details/views/architecture-operating-systems-table.html'
    })
    .state('architectures.details.operating-systems.add', {
        url: '/operating-systems/add',
        collapsed: true,
        controller: 'ArchitectureAddOperatingSystemsController',
        templateUrl: 'architectures/details/views/architecture-operating-systems-table.html'
    });

}]);
