import { Api } from "../../lib/discord"

enum ThemeMode {
	Light = "agYIAhABGgA=",
	Dark  = "agYIARABGgA=",
}

_ = <cmd name="theme">
	<opt type="string" name="mode" />
	
	<run fn={async (opts) => {
		const req = await Api.patch('/users/@me/settings-proto/1', { 
			settings: ThemeMode[opts.mode as keyof typeof ThemeMode] 
		})

		if(req.status != 200) {
			return { ok: false, reason: req.statusText }
		}

		return { ok: true }
	}} />
</cmd>