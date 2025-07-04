import {atomWithStorage} from "jotai/utils"

// this will store the token inside the localstorage of browswer so explecitely we does not have to maintain that
const authAtom = atomWithStorage('authToken', null);

export default authAtom;