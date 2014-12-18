var util = require('util');

module.exports = function(Module) {
	<%= className %>Module = function(moduleManager) {
		Module.apply(this, arguments);

		this.addRoute('<%= commandName %>', function(origin, remote){
			this.reply(origin, 'Not yet implemented.');
		});
	}
	util.inherits(<%= className %>Module, Module);

	<%= className %>Module.prototype.shortName = '<%= className %>';
	<%= className %>Module.prototype.helpText = {
		default: '<%= description %>'
	};
	<%= className %>Module.prototype.usage = {
		default: '<%= commandName %> [arg]'
	};

	return <%= className %>Module;
};