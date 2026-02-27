import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { createPaste } from '../utils/pasteUtils';
import { toast } from 'sonner';

const MAX_LENGTH = 100000; // 100k characters

export function PasteEditor() {
  const [content, setContent] = useState('');
  const [expiration, setExpiration] = useState('1hour');
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    if (content.length > MAX_LENGTH) {
      toast.error(`Content must be less than ${MAX_LENGTH} characters`);
      return;
    }

    setLoading(true);
    try {
      const code = await createPaste(content, expiration, syntaxHighlighting);
      navigate(`/${code}`);
      toast.success('Share link created!');
    } catch (error) {
      console.error('Error creating paste:', error);
      toast.error('Failed to create share. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      {/* Main Textarea */}
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write or paste your text here…"
          className="min-h-[400px] resize-y rounded-2xl border-white/10 bg-white/5 text-base text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          maxLength={MAX_LENGTH}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {content.length.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Syntax Highlighting Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="syntax"
              checked={syntaxHighlighting}
              onCheckedChange={setSyntaxHighlighting}
            />
            <Label htmlFor="syntax" className="text-sm text-gray-300 cursor-pointer">
              Syntax Highlighting
            </Label>
          </div>

          {/* Expiration Dropdown */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="expiration" className="text-sm text-gray-300 whitespace-nowrap">
              Expires in:
            </Label>
            <Select value={expiration} onValueChange={setExpiration}>
              <SelectTrigger id="expiration" className="w-[140px] border-white/10 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-zinc-900 text-white">
                <SelectItem value="10min" className="text-white">10 minutes</SelectItem>
                <SelectItem value="30min" className="text-white">30 minutes</SelectItem>
                <SelectItem value="1hour" className="text-white">1 hour</SelectItem>
                <SelectItem value="6hours" className="text-white">6 hours</SelectItem>
                <SelectItem value="12hours" className="text-white">12 hours</SelectItem>
                <SelectItem value="1day" className="text-white">1 day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          disabled={loading || !content.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Share'
          )}
        </Button>
      </div>
    </div>
  );
}
