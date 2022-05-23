// const baseUrl = 'https://sableplan.herokuapp.com'
const baseUrl = 'http://localhost:4000';

import { useRouter } from "vue-router";
  const Router = useRouter();
const goBack = Router.go(-1);

export default { baseUrl, goBack };
