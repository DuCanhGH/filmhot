import {
  CollectionReference,
  DocumentData,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCollectionQuery: (
  key: string,
  collection: CollectionReference | Query<DocumentData>
) => { loading: boolean; error: boolean; data: QuerySnapshot | null } = (
  key,
  collection
) => {
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);

  //eslint-ignore-next-line
  const [loading, setLoading] = useState(!Boolean(data));
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setData(null);
        setLoading(false);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, [key]);

  return { loading, error, data };
};
