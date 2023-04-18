import { AdoptionRequirements, Prisma } from "@prisma/client";

export interface AdoptionRequirementsRepository {
  createMany(data: Prisma.AdoptionRequirementsUncheckedCreateInput[]): Promise<AdoptionRequirements[]>
}
