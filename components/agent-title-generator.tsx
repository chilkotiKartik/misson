export class AgentTitleGenerator {
  private static prefixes = [
    "Spectral",
    "Quantum",
    "Orbital",
    "Stellar",
    "Cosmic",
    "Nebula",
    "Galactic",
    "Astral",
    "Lunar",
    "Solar",
    "Interstellar",
    "Void",
    "Plasma",
    "Photon",
    "Neutron",
  ]

  private static roles = [
    "Codebreaker",
    "Cipher Master",
    "Signal Decoder",
    "Code Analyst",
    "Vault Guardian",
    "Encryption Specialist",
    "Algorithm Hunter",
    "Decryptor",
    "Crypto Sentinel",
    "Pattern Analyst",
    "Key Master",
    "Sequence Tracker",
    "Binary Voyager",
  ]

  private static suffixes = [
    "",
    "Prime",
    "Elite",
    "Alpha",
    "Omega",
    "- Class Z",
    "- Class X",
    "Supreme",
    "Ultra",
    "Zero",
  ]

  public static generateTitle(): string {
    const prefix = this.getRandomElement(this.prefixes)
    const role = this.getRandomElement(this.roles)
    const suffix = this.getRandomElement(this.suffixes)

    return `${prefix} ${role}${suffix}`
  }

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}
