import { getProviders, signIn, useSession } from "next-auth/react";

import LibraryLogo from "../components/svgs/LibraryLogo";
import style from "../styles/button.module.css";

function LoginButton({ provider, text, providerIcon, ...rest }: any) {
  const { data: session, status } = useSession();

  return (
    <button
      onClick={() => {
        signIn(provider.id);
      }}
      className={style["google-button"]}
      {...rest}
    >
      <i className={providerIcon} />
      <span className={style["google-button__text"]}>
        {text || `Sign in with ${provider.name}`}
      </span>
    </button>
  );
}
export default function Page({ providers }: any) {
  const { google } = providers;

  if (providers == null) return null;

  return (
    <div style={{ width: "100vw", height: "100vh", background: "white" }}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "33vw", minWidth: "20rem" }}>
          <LibraryLogo style={{ width: "100%", fill: "#222" }} />

          {google && (
            <LoginButton
              provider={google}
              text="Sign in with @code.berlin"
              providerIcon="fab fa-google"
              style={{
                "--prim": "#222",
                "--sec": "white",
                marginTop: "3rem",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
