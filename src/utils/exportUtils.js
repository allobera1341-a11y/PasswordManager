/**
 * AI Secure Password Manager - Export Utility
 * Secure JSON export of local vault history.
 */

export const exportEncryptedHistory = (history) => {
  try {
    const data = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      vaultItems: history.map(item => ({
        id: item.id,
        encryptedPassword: item.encryptedPassword, // Passwords remain encrypted
        score: item.securityScore,
        level: item.securityLevel,
        createdAt: item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : item.createdAt
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `aisecure_vault_export_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Export Failed:", error);
    return false;
  }
};
