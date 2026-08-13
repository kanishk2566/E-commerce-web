import { apiFetch } from "./api";
import { Coupon } from "@/types/coupon";
import { toast } from "react-toastify";
import { User } from "@/types/user";
import { getUser } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_USERS_API_BASE_URL;

export async function getCoupons(){
  const coupons = await apiFetch<Coupon[]>(`${API_BASE_URL}`, `/coupons`);

  return coupons;
}

export async function applyCoupon(
  code: string,
  amount: number
): Promise<number> {

  const coupons = await getCoupons();

  const normalizedCode = code.trim().toUpperCase();

  const coupon = coupons.find(
    (item) => item.code === normalizedCode
  );

  if (!coupon) {
    toast.warn("Invalid coupon code");
    return 0;
  }

  if(coupon.min > amount) {
    toast.warn("Cannot apply this coupon");
    return 0;
  }
  
  const discount =
    coupon.type === "fixed"
      ? coupon.value
      : (amount * coupon.value) / 100;

  toast.success("Coupon applied");

  return discount;
}

export async function removeCoupon() {
  await applyCoupon("", 0);
  toast.success("Coupon removed");
}

export async function markCouponUsed(userId: string, code: string) {
  const coupons = await getCoupons();
  const user = await getUser(userId);

  const normalizedCode = code.trim().toUpperCase();

  const coupon = coupons.find(
    (item) => item.code === normalizedCode
  );

  if (!coupon) {
    toast.warn("Invalid coupon code");
    return 0;
  }

  const usedCoupons = user.usedCoupons ?? [];

  if (usedCoupons.includes(coupon.code)) {
    toast.warn("You have already used this coupon");
    return 0;
  }

  await apiFetch<User>(
    `${API_BASE_URL}`,
    `/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usedCoupons: [...usedCoupons, coupon.code],
      }),
    }
  );

}

