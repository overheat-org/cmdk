import { Api } from "../../lib/discord"

_ = <cmd name="app">
	<subcmd name="create">
		<opt type="string" name="name" />

		<run fn={async (opts) => {
			const req = await Api.post('/applications', { name: opts.name, team_id: null })
			
			if(req.status != 201) {
				return {
					ok: false,
					reason: req.statusText
				};
			}

			return { ok: true }
		}} />
	</subcmd>

	<opt name="name" type="string" autocomplete> 
		<subcmd name="delete">
			<run fn={(opts) => {
				console.log("deleting...")
			}} />
		</subcmd>

		<subcmd name="bot">
			<run fn={(opts) => {

			}} />
		</subcmd>
	</opt>
</cmd>