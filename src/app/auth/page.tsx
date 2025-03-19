"use client"
import {useEffect, useState} from 'react';
import styles from '@styles/pages/Auth.module.scss';
import {loginUser, RegisterUser, registerUser} from "@/app/auth/actions";
import MessageModal from "@/features/MessageModal/MessageModal";
import {useRouter} from "next/navigation"; // Припускаємо, що registerUser вже типізований

// Типізація даних форми

export default function Auth() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterUser>({
        email: "",
        username: "",
        password: "",
    });
    const [message, setMessage] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false)
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [successfullyLogged,setSuccessfullyLogged  ] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let user;

            if (!isLogin) {
                user = await registerUser(formData);
                setMessage(user.message);
                if (user) setSuccessfullyLogged(true)
            } else {
                user = await loginUser(formData)
                if (user) setSuccessfullyLogged(true)
            }

            setMessage(user.message);
            setIsVisible(true)

        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage("Something went wrong, please try again.");
            }
            setIsVisible(true)
        };
    }


        useEffect(() => {
            if (isVisible) {
                const timer = setTimeout(() => {
                    setIsVisible(false)
                    if(successfullyLogged){
                        router.push("/");

                    }
                }, 3000);
                return () => clearTimeout(timer);
            }
        }, [isVisible, successfullyLogged, router]);

        return (
            <section className={styles.auth}>
                <nav className={styles.navigation}>
                    <ul className={styles.navigation__list}>
                        <li>
                            <button
                                className={`${styles.navigation__button} ${isLogin ? styles.active : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                login
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${styles.navigation__button} ${!isLogin ? styles.active : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                register
                            </button>
                        </li>
                    </ul>
                </nav>
                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <fieldset className={styles.form__container}>
                            <legend>{isLogin ? "LOGIN DATA" : "REGISTER DATA"}</legend>
                            {isLogin ? (
                                <div>
                                    <label htmlFor="email">EMAIL:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="new-username">NAME:</label>
                                        <input
                                            type="text"
                                            id="new-username"
                                            name="username"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            required
                                            autoComplete="username"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">EMAIL:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label htmlFor={isLogin ? "password" : "new-password"}>PASSWORD:</label>
                                <input
                                    type="password"
                                    id={isLogin ? "password" : "new-password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                />
                            </div>
                            <div>
                                <button type="submit">{isLogin ? "ENTER" : "REGISTER"}</button>
                            </div>
                        </fieldset>

                    </form>
                    <MessageModal message={message} isVisible={isVisible} aria-live="assertive"/>
                </div>
            </section>
        );
    }
