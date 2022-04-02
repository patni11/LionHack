import { useState, useCallback, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3 } from "@/context/web3Context";
import { formatAddress } from "@/utils/helper";
import styles from "./index.module.css";
import { Button } from "@mui/material";

export const WalletConnectButton: React.FC = () => {
  const { connectWallet, address, ens } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);

  const connect = useCallback(async () => {
    setLoading(true);
    await connectWallet();
    localStorage.setItem("isWalletConnected", "true");
    setLoading(false);
  }, [connectWallet]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await connectWallet();
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className={styles.container}>
      {!address ? (
        <LoadingButton
          loading={loading}
          onClick={connect}
          className={styles.connectWalletButton}
          sx={{
            "& .MuiLoadingButton-loadingIndicator": {
              color: "#fff",
            },
          }}
        >
          Connect
        </LoadingButton>
      ) : (
        <div className={styles.userAddress}>
          {/* Your Address: {ens || formatAddress(address)} */}
          <button
            onClick={() => {
              localStorage.setItem("isWalletConnected", "");
              location.reload();
            }}
            className={styles.disconnectWalletButton}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

WalletConnectButton.displayName = "WalletConnectButton";
