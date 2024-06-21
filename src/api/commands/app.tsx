import { Status } from "@consts";
import { Api } from "@lib/discord";

export default

<keyword id="app">
  <keyword id="test">
    {async () => {
      console.log('TESTING')
    }}
  </keyword>

	<keyword id="create">
		<opt type="string" id="name" />

    {async (opts) => {
			const req = await Api.post('/applications', { name: opts.name, team_id: null })
			
			if(req.status != 201) {
				return {
					code: Status.Error,
					reason: req.statusText
				};
			}

			return { code: Status.Ok }
		}}
	</keyword>

	<opt id="name" type="string" autocomplete> 
		<keyword id="delete">
			{async (opts) => {
        const appsReq = await Api.get('/applications');
        const apps = appsReq.data as { id: string, name: string }[];
        const appId = apps.find(a => a.name == opts.name)?.id;

        if(!appId) {
          return {
            code: Status.Error,
            reason: 'App not found'
          }
        }

				const req = await Api.post(`/applications/${appId}/delete`);
        
        if(req.status == 401) {
          return {
            code: Status.MFA,
            async callback(password: string) {
              const req2 = await Api.post('/mfa/finish', { ticket: req.data.mfa.ticket, mfa_type: 'password', data: password })

              if(req2.status != 200) {
                return {
                  code: Status.Error,
                }
              } 

              return { code: Status.Ok }
            }
          }
        }

        return { code: Status.Ok }
			}}
		</keyword>

		<keyword id="bot">
      <keyword id="token-reset">
        {(opts) => {
          
        }}
      </keyword>
		</keyword>
	</opt>
</keyword>
