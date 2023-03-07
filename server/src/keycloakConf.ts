import Keycloak from "keycloak-js";

const realm = process.env.REACT_APP_REALM || "";
const clientId = process.env.REACT_APP_CLIENTID || "";
const url = process.env.REACT_APP_AUTH_SERVER_URL;


class keycloakAdapter{

    protected keycloak: Keycloak;

    public constructor(){
        this.keycloak = new Keycloak({
            url: url,
            realm: realm,
            clientId: clientId,
        });

        this.keycloak.init({checkLoginIframe: false});
    }

    public register(userName: string, password: string){

    }

    public login(userName: string, password: string){

    }

    public logout(userName: string){

    }

}

export const keycloak = new keycloakAdapter();