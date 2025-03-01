import { Component, ErrorInfo, ReactNode, useState } from "react";
import ForFor from "./ForFor";

class ErrorBoundary extends Component {
    constructor() {
        //@ts-ignore
        super();
        
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
         this.setState({
            hasError: true,
            error,
            errorInfo
         })
    }
    resetError = () => {
        this.setState({hasError: false, error: null, errorInfo: null})
    }
    componentDidMount() {
        window.addEventListener("popstate", this.resetError);
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = (...args) => {
            originalPushState.apply(history, args);
            this.resetError();
        };
        
        history.replaceState = (...args) => {
            originalReplaceState.apply(history, args);
            this.resetError();
        };
    }
    componentWillUnmount() {
        window.removeEventListener("popstate", this.resetError);
    }

    render() {
        //@ts-ignore
        if (this.state.hasError) {
            return <ForFor />
        }
        //@ts-ignore
        return this.props.children
    }
}

export default ErrorBoundary

// function ErrorFallback({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: () => void }) {
//   // Проверяем возможные варианты получения статуса ошибки
//   const status = error.status || error.response?.status || "Неизвестная ошибка";

//   return (
//     <main role="alert">
//       <h2> Ошибка {status}!</h2>
//       <p>{error.message}</p>
//       <button onClick={resetErrorBoundary}>Попробовать снова</button>
//       <br />
//       <Link to="/">На главную</Link>
//     </main>
//   );
// }

// export default ErrorFallback;