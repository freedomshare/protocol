import { Address } from '~/utils/types';
import { getGlobalEnvironment } from '~/utils/environment';
import { isAddress, isEmptyAddress } from '~/utils/checks';
import { getContract } from '../utils/getContract';

export const managersToHubs = async (
  contractAddress: Address,
  managerAddress: Address,
  environment = getGlobalEnvironment(),
) => {
  const contract = getContract(contractAddress, environment);
  const hubAddress = await contract.methods
    .managersToHubs(managerAddress.toString())
    .call();
  if (!isAddress(hubAddress) || isEmptyAddress(hubAddress)) {
    throw new Error(`No hub for manager ${managerAddress}`);
  }
  return hubAddress;
};