import { Status } from "@consts";
import { Api } from "@lib/discord";

enum ThemeMode {
	Light = "agYIAhABGgA=",
	Dark  = "agYIARABGgA=",
}

export default 
<keyword id="theme">
	<opt id="mode" type="string" />
	
	{async (opts) => {
		const req = await Api.patch('/users/@me/settings-proto/1', { 
			settings: ThemeMode[opts.mode as keyof typeof ThemeMode] 
		})

		if(req.status != 200) {
			return { ok: Status.Error, reason: req.statusText }
		}

		return { ok: Status.Ok }
	}}
</keyword>
