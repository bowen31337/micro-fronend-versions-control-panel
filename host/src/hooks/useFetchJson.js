import { useState, useEffect } from "react";
import { fetchJson } from "../mfe/utils";

export const useFetchJson = (path) => {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetchJson(path).then((json) => {
      setData(json);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export const useFetchJsons = (paths) => {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    Promise.all(
      paths.map((path) =>
        fetchJson(path)
      )
    )
      .then((values) => setData(values))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
