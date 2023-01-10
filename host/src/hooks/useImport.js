import { useFederatedComponent } from "./useFederatedComponent";
import { useContext } from "react";
import { MFEContext } from "../mfe/Provider";
import {useLocalStorage} from './useLocalStorage'
export const useImport = (path) => {
  if (!path) {
    throw new Error("path is required");
  }
  const [remotes] = useLocalStorage("MFE_REMOTES", []);
  const [state, dispatch] = useContext(MFEContext);



  const [scope, module] = path.split("/");

  const remote = remotes?.find((s) => s?.scope === scope);


  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    remote?.url,
    scope,
    `./${module}`,
    remote?.version
  );

  return { FederatedComponent, errorLoading };
};
