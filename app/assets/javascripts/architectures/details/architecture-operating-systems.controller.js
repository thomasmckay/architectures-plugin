/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 */

/**
 * @ngdoc object
 * @name  Architectures.architectures.controller:ArchitectureOperatingSystemsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Architecture
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the list operating systems details action pane.
 */
angular.module('Architectures.architectures').controller('ArchitectureOperatingSystemsController',
    ['$scope', '$q', '$location', 'gettext', 'Architecture', 'Nutupane',
    function ($scope, $q, $location, gettext, Architecture, Nutupane) {
        var operatingSystemsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'id':          $scope.$stateParams.architectureId,
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true
        };

        operatingSystemsPane = new Nutupane(Architecture, params, 'operatingSystems');
        $scope.operatingSystemsTable = operatingSystemsPane.table;

        $scope.removeOperatingSystems = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                operatingSystemsToRemove = _.pluck($scope.operatingSystemsTable.getSelected(), 'id');

            data = {
                "activation_key": {
                    "operating_system_ids": operatingSystemsToRemove
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Removed %x operating systems from architecture "%y".')
                    .replace('%x', $scope.operatingSystemsTable.numSelected)
                    .replace('%y', $scope.architecture.name)];
                $scope.operatingSystemsTable.working = false;
                $scope.operatingSystemsTable.selectAll(false);
                operatingSystemsPane.refresh();
                $scope.architecture.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors;
                $scope.operatingSystemsTable.working = false;
            };

            $scope.operatingSystemsTable.working = true;
            Architecture.removeOperatingSystems({id: $scope.architecture.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
