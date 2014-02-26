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
 * @name  Architectures.architectures.controller:NewArchitectureController
 *
 * @requires $scope
 * @requires $q
 * @requires FormUtils
 * @requires Architecture
 * @requires Organization
 * @requires CurrentOrganization
 * @requires ContentView
 *
 * @description
 *   Controls the creation of an empty Architecture object for use by sub-controllers.
 */
angular.module('Architectures.architectures').controller('NewArchitectureController',
    ['$scope', '$q', 'FormUtils', 'Architecture', 'Organization', 'CurrentOrganization', 'ContentView',
    function ($scope, $q, FormUtils, Architecture, Organization, CurrentOrganization, ContentView) {

        $scope.architecture = $scope.architecture || new Architecture();
        $scope.panel = {loading: false};
        $scope.organization = CurrentOrganization;

        $scope.$watch('architecture.name', function () {
            if ($scope.architectureForm.name) {
                $scope.architectureForm.name.$setValidity('server', true);
            }
        });

        $scope.save = function (architecture) {
            architecture['organization_id'] = CurrentOrganization;
            architecture.$save(success, error);
        };

        function success(response) {
            $scope.table.addRow(response);
            $scope.transitionTo('architectures.details.info', {architectureId: $scope.architecture.id});
        }

        function error(response) {
            $scope.working = false;
            angular.forEach(response.data.errors, function (errors, field) {
                $scope.architectureForm[field].$setValidity('server', false);
                $scope.architectureForm[field].$error.messages = errors;
            });
        }

    }]
);
