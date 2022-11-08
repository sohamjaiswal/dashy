import { RESTPostChannelsBody } from '@guildedjs/guilded-api-typings';

import { Router } from '@guildedjs/rest';

export class MainServerService {
    readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    createChannel = (data: RESTPostChannelsBody) => {
        return this.router.createChannel(data);
    };

    getChannel = (channelId: string) => {
        return this.router.getChannel(channelId);
    };
}
