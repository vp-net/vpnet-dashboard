import { Link, useNavigate } from "react-router-dom"
import { useState, FormEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/Auth"
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2 } from "@tabler/icons-react"
import { Layout } from "@/components/custom/layout"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeSwitch } from "@/components/dashboard"

export default function Signup() {
  const { signUp, getSession } = useAuth();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((data) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(data);
        console.log("User is already logged in");
      }
      navigate("/");
    }).catch((error) => {
      if(import.meta.env.VITE_ENV === 'development'){
        console.log(error);
      }
    });
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var usernameRegex = /^[a-zA-Z0-9_]*$/;           
    if (username.length < 1) {
      toast({
        variant: "destructive",
        title: "Username is required.",
        description: "Please make sure you have entered a username.",
      });
    }
    else if (username.match(usernameRegex) === null) {
      toast({
        variant: "destructive",
        title: "Invalid username.",
        description: "Please make sure you have entered a valid username.",
      });
    }
    else if (email.length < 1) {
      toast({
        variant: "destructive",
        title: "Email is required.",
        description: "Please make sure you have entered an email.",
      });
    }
    else if (email.match(emailRegex) === null) {
      toast({
        variant: "destructive",
        title: "Invalid email.",
        description: "Please make sure you have entered a valid email.",
      });
    }
    else if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password is too short.",
        description: "Please make sure your password is at least 8 characters long.",
      });
    }
    else if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match.",
        description: "Please make sure your passwords match.",
      });
    }
    else {
      setLoading(true)
      signUp(username, email, password).then((data) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(data)
        }
        navigate("/verify", { state: { fromApp: true, email: email, username: username }})
        setLoading(false)
      }).catch((error) => {
        if(import.meta.env.VITE_ENV === 'development'){
          console.log(error)
        }
        setLoading(false)
      });
    }
  }
  return (
    <Layout className="h-screen">
      <Layout.Header className="h-[10%]">
        <div className='ml-auto flex items-center space-x-4'>
          <TooltipProvider>
            <ThemeSwitch />
          </TooltipProvider>
        </div>
      </Layout.Header>
      <Layout.Body className="h-[90%]">
        <div className="flex justify-center items-center h-[90%]">
          <Card className="mx-4 w-96 bg-inherit">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-muted-foreground hover:underline hover:text-primary">
                  Log In
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Input id="username" placeholder="Username" required onChange={event=> setUsername(event.target.value)}/>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={event=> setEmail(event.target.value)}
                />
                <Input id="password" placeholder="Password" type="password" onChange={event=> setPassword(event.target.value)} />
                <Input id="confirm-password" placeholder="Confirm Password" type="password" onChange={event=> setConfirmPassword(event.target.value)}/>
                <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
                  {loading ? (<IconLoader2 className="mr-2 h-4 w-4 animate-spin"/>) : ("Create an account")}
                </Button>
                <Label className="text-xs text-muted-foreground text-center">By signing up, you agree to our {" "}
                  <Link to="/terms" className="text-muted-foreground underline">
                    {`terms and conditions.`}
                  </Link>
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="hidden md:flex justify-center items-end text-muted-foreground text-xs font-semibold h-[10%]">
          <Link to="/terms" target="_blank" rel="noopener noreferrer" className="hover:underline text-center">Terms and Conditions</Link>
          <div className="mx-4">•</div>
          <Link to="https://dashboard.vp-net.org/privacy"  target="_blank" rel="noopener noreferrer" className="hover:underline text-center">Privacy Policy</Link>
          <div className="mx-4">•</div>
          <Link to="/contact" target="_blank" rel="noopener noreferrer" className="hover:underline text-center">Contact Us</Link>
          <div className="mx-4">•</div>
          <Link to="/refund" target="_blank" rel="noopener noreferrer" className="hover:underline text-center">Cancellation and Refund Policy</Link>
        </div>
      </Layout.Body>
    </Layout>
  )
}
