import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { IconInfoCircle } from '@tabler/icons-react'
import { UserPlan, UserUsage } from "@/interfaces";

export default function MonthlyUsageCard(userPlan : UserPlan | null, userUsage: UserUsage | null){
  const navigate = useNavigate();
  function navigateToPlans() {
    navigate("/plans");
  }
  return(
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>About Premium Bandwidth</AlertDialogTitle>
          <AlertDialogDescription>
          Premium Bandwidth provides access to high-speed, low-latency servers. Your plan determines the bandwidth limit, which resets monthly. Usage of Basic Servers does not deplete your Premium Bandwidth.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Card className="bg-inherit col-span-2">
        <CardHeader className="pb-0">
          <div className="flex">
            <CardDescription className="text-xs md:text-sm font-semibold text-secondary-foreground">Premium Bandwidth</CardDescription>
            <AlertDialogTrigger  className="mt-1 ml-auto hover:cursor-pointer"><IconInfoCircle size={16} /></AlertDialogTrigger>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold">
            {userUsage&&userPlan 
            ? (
              ((((userPlan.plan.bandwidth_limit-userUsage.usage.bandwidth_used+userUsage.usage.active_session_bandwidth)/1024/1024/1024)>=1000)) 
              ? (`${((userPlan.plan.bandwidth_limit-userUsage.usage.bandwidth_used+userUsage.usage.active_session_bandwidth)/1024/1024/1024/1024).toFixed(2)} TB`)
              : (`${((userPlan.plan.bandwidth_limit-userUsage.usage.bandwidth_used+userUsage.usage.active_session_bandwidth)/1024/1024/1024).toFixed(2)} GB`)
              )
            : (<Skeleton className="mt-2 w-[100px] h-[24px] rounded-full" />)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="text-xs h-4 font-semibold text-muted-foreground">
            {userPlan ? (((userPlan.plan.bandwidth_limit/1024/1024/1024)>=1000) ? (`remaining out of ${(userPlan.plan.bandwidth_limit/1024/1024/1024/1024).toFixed(2)} TB`) : (`remaining out of ${(userPlan.plan.bandwidth_limit/1024/1024/1024).toFixed(2)} GB`)) : (<Skeleton className="mt-2 w-[128px] h-[8px] rounded-full" />)}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={navigateToPlans} className="w-full h-6">
            <p className="text-xs font-semibold">View Plans</p>
          </Button>
        </CardFooter>
      </Card>
    </AlertDialog>
    
  )
}
