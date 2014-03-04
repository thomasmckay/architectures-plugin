architectures-plugin
====================

Foretello architectures UI plugin

To add to foretello:
https://github.com/Katello/katello/blob/master/engines/bastion/app/assets/javascripts/bastion/bastion.module.js

angular.module('Bastion', [
    'alchemy',
    ...
    'Architectures.architectures'   <-- Add
]);

https://github.com/Katello/katello/blob/master/engines/bastion/app/assets/javascripts/bastion/bastion.js

//= require "bastion/activation-keys/activation-keys.module.js"
//= require_tree "./activation-keys"
//= require "architectures/architectures.js" <-- Add

Add gemspec to foreman/bundler.d/Gemfile.local.rb

gemspec :path => '/home/tomckay/code/architectures-plugin'
