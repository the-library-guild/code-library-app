import { getProviders, signIn, useSession } from "next-auth/react";

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
function Logo({ ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.6 26.9" {...rest}>
      <path
        fill="#222"
        d="M13.3 20.5c-3.6 0-6.5-3.2-6.5-7.1s2.9-7.1 6.5-7.1c1.7 0 3.3.8 4.5 2l4.6-4.5C19.9 1.5 16.7 0 13.1 0 5.9 0 0 6 0 13.5 0 20.9 5.9 27 13.1 27c3.6 0 6.9-1.5 9.2-3.9l-4.6-4.5c-1.1 1.2-2.7 1.9-4.4 1.9zM32.2.6L19.5 13l-.4.4 13.1 12.9 4.5-4.4-8.9-8.4L36.7 5 32.2.6zm35.1.3h-8.6V26h8.7C75.3 26 81 21.2 81 13.5 81 5.7 75.3.9 67.3.9zm0 19.5h-2.1V6.6h2.1c4.6 0 7 3 7 6.9 0 3.7-2.6 6.9-7 6.9zm35.3-13.8V.9H84V26h18.6v-5.6H90.5v-4.3h11.8v-5.6H90.5V6.6h12.1zM42.8.6L38.3 5l8.9 8.5-8.9 8.4 4.5 4.4 13.1-12.9-.4-.4L42.8.6z"
      />
    </svg>
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
          <Logo style={{ width: "100%", fill: "#222" }} />

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
