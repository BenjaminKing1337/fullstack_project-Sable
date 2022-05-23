import { useRouter } from "vue-router";
const Router = useRouter();
const goBack = () => {
  return Router.go(-1);
};

export default goBack;
