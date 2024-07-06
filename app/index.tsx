import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function Index() {
    const [connected, setConnected] = useState<boolean | null>(false);

    const disableZoom = `const meta = document.createElement('meta');
                    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
                    meta.setAttribute('name', 'viewport');
                    document.getElementsByTagName('head')[0].appendChild(meta);`;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    if (!connected) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.bgColor,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ textTransform: "capitalize", color: "#fff",fontSize:22 }}>
                    no internet
                </Text>
            </View>
        );
    }

    return (
        <>
            <WebView
                useWebKit={true}
                injectedJavaScript={disableZoom}
                source={{ uri: "https://mehdikidai.github.io/portfolio" }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                overScrollMode="never"
            />
            <StatusBar style="dark" />
        </>
    );
}
