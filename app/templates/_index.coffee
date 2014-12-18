module.exports = (Module) ->
	class <%= className %>Module extends Module
		shortName: '<%= className %>'
		helpText:
			default: '<%= description %>'
		usage:
			default: '<%= commandName %> [arg]'

		constructor: (moduleManager) ->
			super

			@addRoute '<%= commandName %>', (origin, route) =>
				@reply origin, "Not yet implemented."

	<%= className %>Module