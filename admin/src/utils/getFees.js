export function calculateFees(consideration) {
  const tier1Limit = 10000000; // Up to TZS 10 million
  const tier2Limit = 40000000; // Next TZS 40 million

  const tier1Rate = 0.017; // 1.7%
  const tier2Rate = 0.015; // 1.5%
  const tier3Rate = 0.008; // 0.8%

  const vatRate = 0.18; // 18%
  const dseFeeRate = 0.0014; // 0.14%
  const cmsaFeeRate = 0.0014; // 0.14%
  const fidelityFeeRate = 0.0002; // 0.02%
  const cdsFeeRate = 0.0006; // 0.06%

  let totalCommission = 0;

  // Tier 1 Calculation
  const commissionTier1 = Math.min(consideration, tier1Limit) * tier1Rate;
  totalCommission += commissionTier1;

  // Tier 2 Calculation (if applicable)
  const remainingAfterTier1 = Math.max(0, consideration - tier1Limit);
  const commissionTier2 = Math.min(remainingAfterTier1, tier2Limit) * tier2Rate;
  totalCommission += commissionTier2;

  // Tier 3 Calculation (if applicable)
  const remainingAfterTier2 = Math.max(0, remainingAfterTier1 - tier2Limit);
  const commissionTier3 = remainingAfterTier2 * tier3Rate;
  totalCommission += commissionTier3;

  // Other Fees
  const vat = totalCommission * vatRate;
  const dseFee = consideration * dseFeeRate;
  const cmsaFee = consideration * cmsaFeeRate;
  const fidelityFee = consideration * fidelityFeeRate;
  const cdsFee = consideration * cdsFeeRate;

  const totalCharges =
    totalCommission + vat + dseFee + cmsaFee + fidelityFee + cdsFee;
  const totalConsideration = consideration + totalCharges;

  return {
    commissionTier1,
    commissionTier2,
    commissionTier3,
    totalCommission,
    vat,
    dseFee,
    cmsaFee,
    fidelityFee,
    cdsFee,
    totalCharges,
    totalConsideration,
  };
}
