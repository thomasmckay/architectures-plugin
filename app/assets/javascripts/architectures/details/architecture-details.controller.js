/**
 * Copyright 2013-2014 Red Hat, Inc.
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
 * @name  Architectures.architectures.controller:ArchitectureDetailsController
 *
 * @requires $scope
 * @requires $state
 * @requires $q
 * @requires gettext
 * @requires Architecture
 *
 * @description
 *   Provides the functionality for the activation key details action pane.
 */
angular.module('Architectures.architectures').controller('ArchitectureDetailsController',
    ['$scope', '$state', '$q', 'gettext', 'Architecture',
    function ($scope, $state, $q, gettext, Architecture) {
        $scope.successMessages = [];
        $scope.errorMessages = [];

        if ($scope.architecture) {
            $scope.panel = {loading: false};
        } else {
            $scope.panel = {loading: true};
        }

        $scope.architecture = Architecture.get({id: $scope.$stateParams.architectureId}, function (architecture) {
            $scope.$broadcast('architecture.loaded', architecture);
            $scope.panel.loading = false;
        });

        $scope.save = function (architecture) {
            var deferred = $q.defer();

            architecture.$update(function (response) {
                deferred.resolve(response);
                $scope.successMessages.push(gettext('Activation Key updated'));
                $scope.table.replaceRow(response);
            }, function (response) {
                deferred.reject(response);
                $scope.errorMessages.push(gettext("An error occurred saving the Activation Key: ") + response.data.displayMessage);
            });
            return deferred.promise;
        };

        $scope.removeArchitecture = function (architecture) {
            var id = architecture.id;

            architecture.$delete(function () {
                $scope.removeRow(id);
                $scope.transitionTo('architectures.index');
                $scope.successMessages.push(gettext('Architecture removed.'));
            }, function (response) {
                $scope.errorMessages.push(gettext("An error occurred removing the Architecture: ") + response.data.displayMessage);
            });
        };

    }]
);
