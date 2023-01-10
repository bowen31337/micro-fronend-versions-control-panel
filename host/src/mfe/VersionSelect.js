import { useContext, useEffect, useMemo } from "react";
import { MFEContext } from "./Provider";

import { useLocalStorage } from "../hooks/useLocalStorage";
export const VersionSelect = ({ scope }) => {
  //   const { data, loading } = useFetchJson(`${url}/remoteEntries/index.json`);

  const [state, dispatch] = useContext(MFEContext);
  const [_, setStorage] = useLocalStorage("MFE_REMOTES", []);

  console.log(state);
  const currentRemote = useMemo(() => {
    return state.find((item) => item.scope === scope);
  }, [scope, state]);

  //   useEffect(() => {
  //     if (data?.length > 0) {
  //       console.log(data);
  //       dispatch({type:'UPDATE_REMOTE', payload: { url, scope, version: data[0] }})
  //     }
  //   }, [data, dispatch, scope, url]);

  if (!state) {
    return <p>loading...</p>;
  }
  return (
    <select
      onChange={(e) => {
        dispatch({
          type: "UPDATE_REMOTE",
          payload: { scope, version: e.target.value },
        });

        setStorage((cachedRemotes) => {
          const existScope = cachedRemotes.find(
            (item) => item?.scope === scope
          );

          if (existScope) {
            return cachedRemotes.map((item) => {
              if (item?.scope === scope) {
                return {
                  ...item,
                  url:currentRemote?.url,
                  scope,
                  version: e.target.value,
                };
              }
              return item;
            });
          }
          return [
            ...cachedRemotes,
            { url: currentRemote?.url, scope, version:  e.target.value },
          ];
        });
      }}
      value={currentRemote?.version}
    >
      {currentRemote?.versions?.map((version) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))}
    </select>
  );
};
